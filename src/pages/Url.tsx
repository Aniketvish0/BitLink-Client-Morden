import { useParams } from "react-router-dom"
import { getUrlAnalytics } from "@/api/urlApi";
import { useEffect, useState } from "react";
import QRcode from "@/components/QRcode";
const Url = () => {
    const {shortId} = useParams<{shortId:string}>();
    const [url, setUrl] = useState("https://bitlink-client-morden.vercel.app");
    const getUrlDetails = async () => {
        if (shortId) { 
            const response = await getUrlAnalytics(shortId);
            console.log(response);
        }
    };
    useEffect(() =>{
        getUrlDetails();
        setUrl(`${import.meta.env.VITE_API_URL}/${shortId}`)
    },[shortId]);
    
  return (
    <div className="flex flex-col py-8 md:px-40 md:flex-row gap-2">
        <div >
         <h2 className="text-bold text-2xl block">{shortId}</h2>
         <QRcode data={url} className="flex justify-center flex-col"/>
        </div>  
        <div>
        </div>  
    </div>
  )
}

export default Url