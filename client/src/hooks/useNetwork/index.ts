import axios from "axios"
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

export default function useNetwork({ method, uri, payload , config }: { method: string, uri: string, payload?: any , config?:any }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage]=useState('')

    const axiosConfig:AxiosRequestConfig ={
        headers:{
            'Content-Type': 'application/json',
        },
        withCredentials:true,
        ...config
    }

    const endpoint = import.meta.env.VITE_API_URL;
    useEffect(()=>{
        (async()=>{
            try {
                setLoading(true)
                setError('')
                setMessage('')
                if(method === "post"){
                    const response = await axios[method](`${endpoint}${uri}`, payload , axiosConfig)
                    setData(response.data.data);
                    setMessage(response.data.message)
                }
                if(method === "get"){
                    const response = await axios[method](`${endpoint}${uri}`,axiosConfig)
                    setMessage(response.data.message)
                }
            } catch (error:any) {
                setError(error.response.data.message);
            }finally{
                setLoading(false);
                setError('');
            }
        })();
    },[])

    return [data,loading , message , error];

}

