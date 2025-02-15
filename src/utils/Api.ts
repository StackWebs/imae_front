import {toast} from "react-toastify";
// import { Auth } from 'aws-amplify'

const apiBaseUrl = 'http://localhost:8080/api'
const requiresCors = false

/*async function signIn(username : string, password : string ,email : string) {
    try {
        const user = await Auth.signIn({
            username,
            password,
            attributes: {
                email
            }
        })
    }
}*/

const  Api = {
    get: async function(relativePath: any) {
        return send('GET', relativePath, null)
    },
    post: async function post(relativePath: string, requestBody: any) {
        return send('POST', relativePath, requestBody)
    },
    put (relativePath: string, requestBody: any) {
        return send('PUT', relativePath, requestBody)
    },
    delete(relativePath: string) {
        return send('DELETE', relativePath,null)
    },
    patch(relativePath: string, requestBody: any) {
        return send('PATCH', relativePath, requestBody)
    }
}

async function getData(response: Response, relativePath: string) {

    let data = null
    if (response.status !== 204) {
        data = await response.json()
    }

    if (!response.ok) {
        if (data.message && data.message !== "" && data.message !== " " && data.message !== "null") {
            let expludedRelativePath = ['/tasks/new/history','/tasks/new/comments']

            if(!expludedRelativePath.includes(relativePath)) {
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
        throw {status: response.status, details: data}
    }
    return data
}

async function send(method: any, relativePath: string, requestBody: any) {
    let options : RequestInit = {}
    if(requiresCors) {
        options.credentials = 'include'
    }
    options.method = method
    if(requestBody) {
        options.headers = {
            'Content-Type': 'application/json',
        }
        options.body = JSON.stringify(requestBody)
        //options.mode = 'no-cors'
    }

    options.headers = {
        ...options.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
    }

    //await setTokens()
    //const response : Response =
    await fetch(apiBaseUrl + relativePath, options).then((response) => {
        if(method === 'DELETE' && response.status === 200) {
            return
        }
        return getData(response,relativePath)
    }).catch((error) => {
        setTokens().then(() => {
            options.headers = {
                ...options.headers,
                'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
            }
            fetch(apiBaseUrl + relativePath, options).then((response) => {
                if (method === 'DELETE' && response.status === 200) {
                    return
                }
                return getData(response, relativePath)
            }).catch((error) => {
                console.error(error)
            })
        })
    })

}

async function setTokens(): Promise<void> {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/x-amz-json-1.1");
    myHeaders.append("X-Amz-Target", "AWSCognitoIdentityProviderService.InitiateAuth");

    const raw: string = JSON.stringify({
        AuthParameters: {
            USERNAME: "gerard.rovellat",
            PASSWORD: "IMAELogistics1!",
            SECRET_HASH: "7ZoyXWHscknIEmKTG9Q6tOtuc5TmqQOlNt31RQxKQls="
        },
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "vusv154k0pbqrdfefsfc0opd2"
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response: Response = await fetch("https://cognito-idp.eu-west-3.amazonaws.com/", requestOptions);
        const result: string = await response.text();
        const json = JSON.parse(result)
        if(json.AuthenticationResult && json.AuthenticationResult.AccessToken) {
            localStorage.setItem('AccessToken', json.AuthenticationResult.AccessToken)
        }
        if(json.AuthenticationResult && json.AuthenticationResult.IdToken) {
            localStorage.setItem('IdToken', json.AuthenticationResult.IdToken)
        }
        if(json.AuthenticationResult && json.AuthenticationResult.RefreshToken) {
            localStorage.setItem('RefreshToken', json.AuthenticationResult.RefreshToken)
        }
        console.log(localStorage);
    } catch (error) {
        console.error(error);
    }
}

export default Api
