
import { Button } from '../ui/button';
import { Trash2, X } from 'lucide-react';
import { deleteUrl } from '@/api/urlApi';
import toast from 'react-hot-toast';


type DeleteUrlProps = {
    onClose: () => void; 
    shortId: string;
};

const DeleteUrl = ({onClose , shortId} : DeleteUrlProps) => {
  const handledeleteurl = async() => {
    try{
     const response = await deleteUrl(shortId);
     console.log(response.data);
     toast.success("URL deleted successfully");
    }catch(error){
        toast.error("Error while deleting URL");
        console.log(error);
    }
  }
  return (
    <div className="fixed z-20 inset-0 bg-opacity-30  backdrop-blur-sm flex items-center justify-center">
        <div className='flex flex-col gap-5 justify-center items-center mx-auto px-8 py-6 dark:bg-[#1b1e25] rounded-lg bg-white shadow-sm shadow-slate-800'>
            <button 
                  onClick={onClose}
                  className="place-self-end text-gray-200 hover:text-gray-700 transition "
                  >
                   <X size={30}/>
            </button>
            <Trash2 size={100}/>
            <h2 >Are you Sure ?</h2>
            <div className='flex justify-center gap-10 '>
                <Button className='px-10 py-4 bg-red-800 transition-colors  hover:bg-red-600'
                        onClick={() => {handledeleteurl()}}
                >Yes</Button>
                <Button className='px-10 py-4 bg-background transition-colors hover:bg-zinc-950 '
                        onClick={onClose}
                >No</Button>
            </div>
        </div>
    </div>
  )
}

export default DeleteUrl