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
    <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <h2>ShortID</h2>
        </div>
        <div>
            <h3>Created at</h3>
        <div className="grid grid-cols-2 grid-rows-2">

        </div>
        </div>
    </div>
  )
}

export default Url