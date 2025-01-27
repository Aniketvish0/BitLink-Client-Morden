import { X , Copy } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { shortenUrl, updateUrl } from "@/api/urlApi";
import toast from "react-hot-toast";
import QRCode from "../QRcode";

type CreateLinkPopupModalProps = {
  onClose: () => void,
  forUpdate : boolean, 
  shortId? : string;
};
const Createurl = ({onClose , forUpdate, shortId = ''} : CreateLinkPopupModalProps) => {
  const [redirectURL, setRedirectURL] = useState('');
  const [customAlias , setCustomAlias]  = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);
  const [expirationdate , setExpirationdate] = useState<Date | null>(null);
  const [shortID, setShortID] = useState('');
  const [loading, setLoading] = useState(false);

const handleCreateUrl = async(e: React.FormEvent) =>{
    e.preventDefault();
    try{
        setLoading(true);
        const response = await shortenUrl(redirectURL,customAlias,isActive);
        console.log(response.data);
        setShortID(response.data.shortID);
        setLoading(false);
        toast.success(response.data.message);
    }catch(error : any){
        toast.error(error.response.data.error || "Error while creating short URL");
    }
}

const handleUpdateUrl =  async(e : React.FormEvent) => {
    e.preventDefault();
    try{
        setLoading(true);
        const response = await updateUrl(shortId ,redirectURL,isActive,customAlias);
        console.log(response);
        setLoading(false);
        toast.success("Url Updated Successfully")
    }catch(error){
        console.log(error);  
        toast.error("Unable to update URL"); 
    }
}
const handleCopy = (shortID: string) => {
  navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/${customAlias ? customAlias : shortID}`);
  toast.success('URL copied to clipboard!');
};
  return  (
    <div className="fixed z-20 inset-0 bg-opacity-30 backdrop-blur-lg flex items-center justify-center">
        <div className="flex flex-col w-full max-w-sm mx-auto px-8 py-6 dark:bg-[#1c1f26] rounded-lg bg-white shadow-2xl">
              <button 
              onClick={onClose}
              className="place-self-end py-2 px-4 text-gray-200 hover:text-gray-700 transition duration-200"
              >
               <X size={30}/>
              </button>
              <form onSubmit={forUpdate ? handleUpdateUrl : handleCreateUrl} className="space-y-4">
               <div>
                 <label htmlFor="redirectURL" className="block mb-1 dark:text-gray-300 text-[#0f1117]">Redirect URL</label>
                 <Input
                   id="redirectURL"
                   type="text"
                   value={redirectURL}
                   onChange={(e) => setRedirectURL(e.target.value)}
                   required
                   placeholder='https://www.xyz.abc'
                   className="dark:bg-[#2c2f36] border-gray-700"
                 />
               </div>
               <div>
                 <label htmlFor="customAlias" className="block mb-1 dark:text-gray-300 text-[#0f1117]">Set Alias</label>
                 <Input
                   id="customAlias"
                   type="text"
                   value={customAlias}
                   onChange={(e) => setCustomAlias(e.target.value)}
                   placeholder='abcd'
                   className="dark:bg-[#2c2f36] border-gray-700"
                 />
               </div>
               <div className="flex items-center justify-between">
                 <label htmlFor="isActive" className="block mb-1 dark:text-gray-300 text-[#0f1117] mr-4">Set Active</label>
                 <input
                   id="isActive"
                   type="checkbox"
                   checked={isActive}
                   onChange={(e) => setIsActive(e.target.checked)}
                   className="h-4 w-4  border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none transition duration-200 ease-in-out"
                 />
               </div>
               <div>
                 <label htmlFor="expirationdate" className="block mb-1 dark:text-gray-300 text-[#0f1117]">Expiration Date</label>
                 <Input
                   id="expirationdate"
                   type="date"
                   value={expirationdate ? expirationdate.toISOString().split('T')[0] : ''}
                   onChange={(e) => setExpirationdate(e.target.value ? new Date(e.target.value) : null)}
                   className="dark:bg-[#2c2f36] border-gray-700 flex items-center justify-center"
                 />
               </div>
               { shortID && 
                <div className="w-full flex justify-between py-4 px-4 bg-indigo-950 rounded-lg">
                 <span>{`${import.meta.env.VITE_API_URL}/${customAlias ? customAlias : shortID}`}</span>
                 <Copy onClick={() => handleCopy(shortID)}/>
                </div>
                }
                {shortID &&
                 <QRCode size={90} data={`${import.meta.env.VITE_API_URL}/${customAlias ? customAlias : shortID}-qr`}
                 className="mt-4 flex md:flex-row flex-col justify-center md:gap-4 gap-1"
                 /> 
                }
               <Button type="submit" className={`w-full text-white ${forUpdate ? "bg-green-500 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700" } `}>
                {loading ?`${forUpdate ? "Updating.." : "Shortening..." }`:`${forUpdate ? "Update" : "Shorten"}`} 
                </Button>
              </form>
        </div>
    </div>
  )
}

export default Createurl