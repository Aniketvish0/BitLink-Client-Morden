import { useParams } from "react-router-dom"
import { getUrlAnalytics } from "@/api/urlApi";
import { useEffect } from "react";

const Url = () => {
    const {shortId} = useParams<{shortId:string}>();
    
    const getUrlDetails = async () => {
        if (shortId) { 
            const response = await getUrlAnalytics(shortId);
            console.log(response);
            
        }
    };

    useEffect(() =>{
        getUrlDetails();
    },[shortId]);

  return (
    <div>Url :
        welcome to url page of : :
        :
        :
        :
        :{shortId}
    </div>
  )
}

export default Url