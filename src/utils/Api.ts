import {toast} from "react-toastify";
import {refreshTokenAuth, signIn} from "./Cognito";
const axios = require('axios').default;

//const apiBaseUrl = 'http://imae-logistics-api-pro.eba-wyx8azbd.eu-west-3.elasticbeanstalk.com/api'
const apiBaseUrl = 'http://localhost:8080/api'

const  Api = {
    get: async function(relativePath: any, responseType: any = 'json') {
        return send('GET', relativePath, null, responseType)
    },
    post: async function post(relativePath: string, requestBody: any, responseType: any = 'json') {
        return send('POST', relativePath, requestBody, responseType)
    },
    put (relativePath: string, requestBody: any, responseType: any = 'json') {
        return send('PUT', relativePath, requestBody, responseType)
    },
    delete(relativePath: string, responseType: any = 'json') {
        return send('DELETE', relativePath,null, responseType)
    },
    patch(relativePath: string, requestBody: any, responseType: any = 'json') {
        return send('PATCH', relativePath, requestBody, responseType)
    },
}


async function send(method: any, relativePath:any, data:any, responseType: any = 'application/json') {
    return await axios({
        method: method,
        baseURL: apiBaseUrl,
        url: relativePath,
        data: data,
        responseType: responseType,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        }
    }).then(function(response:any) {
        return response.data || null;
    }).catch(function(error:any) {
        if(error.status === 401) {
            return refreshTokenAuth().then(() => send(method, relativePath, data, responseType))
        }
        else {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            throw error
        }
    })
}
export default Api
