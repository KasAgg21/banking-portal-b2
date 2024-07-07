import axios from "axios";

let baseURL="http://localhost:5000/";

let publicAxios=axios.create({baseURL});

const privateReq= axios.create({baseURL});

privateReq.interceptors.request.use((config)=>
{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

export {publicAxios,privateReq}; 