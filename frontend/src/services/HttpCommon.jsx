import axios from "axios";


const Base_url = import.meta.env.VITE_BASE_URL;

export const jsonData =  axios.create({

    baseURL:Base_url,

    headers:{

        "Content-Type":"application/json"
    },
    withCredentials:true,

});


export const fileUploadData = axios.create({

    baseURL:Base_url,

    headers:{

        "Content-Type":"multipart/form-data"
    },
    withCredentials:true

})









