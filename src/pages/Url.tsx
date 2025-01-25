import { useParams } from "react-router-dom"
import { getUrlAnalytics } from "@/api/urlApi";
import { useEffect, useState } from "react";
import QRcode from "@/components/QRcode";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import RenderLineChart from "@/components/charts/RenderLineChart";



const Url = () => {
    const {shortId} = useParams<{shortId:string}>();
    const [url, setUrl] = useState("https://bitlink-client-morden.vercel.app");
    const [urldata, seturldata] = useState<any>();
    const handleCopy = (shortUrl: string) => {
      navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/${shortUrl}`);
      toast.success('URL copied to clipboard!');
    };
    const getUrlDetails = async () => {
        if (shortId) { 
            const response = await getUrlAnalytics(shortId);
            seturldata(response.data);
            console.log(response.data);
        }
    };
    useEffect(() =>{
        getUrlDetails();
        setUrl(`${import.meta.env.VITE_API_URL}/${shortId}`)
    },[shortId]);
    const handleEditQR = () => {
      toast.success("Edit QR Feature is Coming Soon")
    }
  return (
    shortId && (
      <div className="h-full">
        <div className="flex flex-col py-8 md:px-40  md:flex-row gap-10 ">
            <div className="flex gap-8 flex-col mx-auto">
              <div className="text-center md:text-start">
                <h2 className="text-bold text-start text-2xl flex items-center gap-4">{shortId} <Copy onClick={()=>handleCopy(shortId)} strokeWidth={1.5} size={18} className="hover:text-blue-500 font-bold"/></h2>
                <p className="text-xs mt-3 text-gray-400">created at : {new Date(urldata?.fulldoc?.createdAt).toLocaleString()}</p>
              </div>
              <QRcode data={url} size={150} />
              <Button variant="default" size="sm" className="bg-rose-700 hover:bg-rose-800 mx-auto sm:w-[85%] h-8" onClick={handleEditQR}>Edit QRCode</Button>
             </div> 
            <div className="w-full md:ml-10 grid md:grid-cols-2 md:grid-rows-2 lg:gap-16 gap-6 p-4 ">
              <div className="border border-green-500  py-4 px-6 rounded-md ">
                <span className="text-gray-400">Total Clicks</span>
                <h3 className="text-2xl font-medium mt-4">{urldata?.directvisits?.totalCount+urldata?.qrvisits?.totalCount}</h3>
              </div>
              <div className="border border-blue-600 py-4 px-6 rounded-md ">
                <span className="text-gray-400">Qr Clicks</span>
                <h3 className="text-2xl font-medium mt-4">{urldata?.qrvisits?.totalCount}</h3>
              </div>
              <div className="border border-green-700  py-4 px-6 rounded-md ">
                <span className="text-gray-400">This month</span> 
                <h3 className="text-2xl font-medium mt-4">{30}</h3>
              </div>
              <div className="border border-blue-800 py-4 px-6 rounded-md ">
                <span className="text-gray-400">This month</span>
                <h3 className="text-2xl font-medium mt-4">{40}</h3>
              </div>
            </div>  
        </div>
    </div>
    )
  )
}

export default Url