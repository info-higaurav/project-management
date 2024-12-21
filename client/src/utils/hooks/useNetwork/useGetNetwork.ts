import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetNetwork(endpoint:string){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState<any[] | null>(null);
    const baseURL = import.meta.env.VITE_API_URL;
    const config ={
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    }
    useEffect(()=>{
        (async()=>{
            try {
                setError("");
                setMessage("");
                setLoading(true);
                const response = await axios.get(`${baseURL}${endpoint}`, config);
                setData(response?.data.data || []);
                setMessage(response?.data.message);
            } catch (error:any) {
                setError(error?.response?.data?.error);
                setData([]);
            }finally{
                setLoading(false);                
            }
           
        })();
    },[endpoint])

    return [loading, error, message, data];
}