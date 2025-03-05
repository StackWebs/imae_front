import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
    type InitiateAuthCommandInput,
    type SignUpCommandInput,
    type ConfirmSignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../config-cognito.json";

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
            sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
            sessionStorage.setItem(
                "accessToken",
                AuthenticationResult.AccessToken || "",
            );
            sessionStorage.setItem(
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