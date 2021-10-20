import axios from 'axios';

const URL_API_LOGIN = "http://localhost:3000/users/login";

const URL_API_SIGNUP = "http://localhost:3000/signup";

const URL_API_GET_QLSV = "http://localhost:3000/qlsvs";

const URL_API_POST_QLSV = "http://localhost:3000/qlsvs";


export async function getPostFromAPI(authorization) {
    const respones = await axios ({
        method: 'GET',
        url: URL_API_GET_QLSV,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${authorization}`
        }
    });
    return respones;
    
}

export async function postQlsvToAPI(authorization, data) {
    const respones = await axios ({
        method: 'POST',
        url: URL_API_POST_QLSV,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${authorization}`
        },
        data: JSON.stringify(data)
    });
    return respones;
    
}
export async function deleteQlsvToAPI(authorization, data) {
    const respones = await axios ({
        method: 'DELETE',
        url: `http://localhost:3000/qlsvs/${data}`,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authorization}`
        },
    });
    return respones;
    
}

export async function putQlsvToAPI(authorization, id, data) {
    const respones = await axios ({
        method: 'PUT',
        url: `http://localhost:3000/qlsvs/${id}`,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authorization}`,
            'content-type': 'application/json',
        },
        data: JSON.stringify(data)
    });
    return respones;
    
}



// export async function getSpecificPostFromAPI(id) {
//     const respones = await axios.get(URL_API_SPECIFIC_POST + id);
//     return respones;
// }

export async function authLoginAPI(dataAuth) {
    
    const status = await axios({
        method: 'POST',
        url: URL_API_LOGIN,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        data: JSON.stringify(dataAuth)
    });

    return status;
}


export async function authSignUpAPI(dataAuth) {

    const status = await axios({
        method: 'POST',
        url: URL_API_SIGNUP,
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(dataAuth)
    });

    return status;
}