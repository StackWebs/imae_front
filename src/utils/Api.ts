import {toast} from "react-toastify";
// import { Auth } from 'aws-amplify'

const apiBaseUrl = 'http://imae-logistics-api-pro.eba-wyx8azbd.eu-west-3.elasticbeanstalk.com/api'
//const apiBaseUrl = 'http://localhost:8080/api'
const requiresCors = false

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

async function getData(response: Response, relativePath: string, responseType: any = 'json') {

    let data = null
    if (response.status !== 204 && responseType === 'json') {
        data = await response.json()
    }

    if(responseType === 'arraybuffer') {
        data = await response.arrayBuffer()
    }

    console.log('response',response)
    console.log('data',data)

    if (!response.ok) {
        if (data.message && data.message !== "" && data.message !== " " && data.message !== "null") {
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
        throw {status: response.status, details: data}
    }
    return data
}

async function send(method: any, relativePath: string, requestBody: any, responseType: any) {
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
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'responseType': responseType,
        'Content-Type': responseType === 'arraybuffer' ? 'application/pdf' : 'application/json'
    }

    return await fetch(apiBaseUrl + relativePath, options).then((response) => {
        if(method === 'DELETE' && response.status === 200) {
            return
        }
        return getData(response,relativePath,responseType)
    }).catch((error) => {
        console.error(error)
    })

}

export default Api
