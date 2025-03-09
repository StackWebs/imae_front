import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
    type InitiateAuthCommandInput,
    type SignUpCommandInput,
    type ConfirmSignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../../config-cognito.json";
import { jwtDecode } from 'jwt-decode';

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region,
});

export const signIn = async (username: string, password: string) => {
    const secretHash = await generateSecretHash(username, config.clientId, config.clientSecret);
    const params: InitiateAuthCommandInput = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: secretHash
        },
    };
    try {
        const command = new InitiateAuthCommand(params);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            localStorage.setItem("idToken", AuthenticationResult.IdToken || "");
            localStorage.setItem(
                "accessToken",
                AuthenticationResult.AccessToken || "",
            );
            localStorage.setItem(
                "refreshToken",
                AuthenticationResult.RefreshToken || "",
            );
            return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

export const refreshTokenAuth = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const idToken = localStorage.getItem("idToken");
    if (!refreshToken) {
        throw new Error("No refresh token found. User must sign in again.");
    }

    const username = getUsernameFromIdToken(idToken || "");
    const secretHash = await generateSecretHash(username, config.clientId, config.clientSecret);
    const params: InitiateAuthCommandInput = {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
            SECRET_HASH: secretHash
        },
    };

    try {
        const command = new InitiateAuthCommand(params);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            localStorage.setItem("idToken", AuthenticationResult.IdToken || "");
            localStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
            return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error refreshing token: ", error);
        throw error;
    }
};

export const signUp = async (email: string, password: string) => {
    const params: SignUpCommandInput = {
        ClientId: config.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
        ],
    };
    try {
        const command = new SignUpCommand(params);
        const response = await cognitoClient.send(command);
        console.log("Sign up success: ", response);
        return response;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

export const confirmSignUp = async (username: string, code: string) => {
    const params: ConfirmSignUpCommandInput = {
        ClientId: config.clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        const command = new ConfirmSignUpCommand(params);
        await cognitoClient.send(command);
        console.log("User confirmed successfully");
        return true;
    } catch (error) {
        console.error("Error confirming sign up: ", error);
        throw error;
    }
};

async function generateSecretHash(username: string, clientId: string, clientSecret: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(clientSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const data = new TextEncoder().encode(username + clientId);
    const signature = await crypto.subtle.sign("HMAC", key, data);

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export const getUsernameFromIdToken = (idToken: string) => {
    try {
        const decoded: any = jwtDecode(idToken);
        return decoded?.["cognito:username"] || null;
    } catch (error) {
        console.error("Error decoding ID Token:", error);
        return null;
    }
};
