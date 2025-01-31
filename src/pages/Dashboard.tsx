import { useState} from 'react';
import { getUserUrls} from '../api/urlApi';
import { Button } from '../components/ui/button';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  BarChart2, 
  Pencil, 
  Trash2, 
  Link as LinkIcon,
  ExternalLink,
  Copy,
  PlusIcon
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Createurl from '@/components/Modals/Createurl';
import DeleteUrl from '@/components/Modals/DeleteUrl';
import Loader from '@/components/ui/Loader';

const Dashboard = () => {
  const loaderData = useLoaderData() as {
    urls: any[];
    stats: { totalUrls: number; totalVisitors: number };
  };
  const [loading, setLoading] = useState(false);
  const [showPopupModal , setShowPopupModal] = useState(false);
  const [showDeleteUrlModal , setShowDeleteUrlModal] = useState(false);
  const [showEditUrlModal , setShowEditUrlModal] = useState(false);
  const [urls, setUrls] = useState(loaderData.urls);
  const [stats, setStats] = useState(loaderData.stats);
  const [shortId, setshortId] = useState("");
  const navigate = useNavigate();
  

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/${shortUrl}`);
    toast.success('URL copied to clipboard!');
  };
  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserUrls();
      const userData = response.data.Response[0];
      setUrls(userData.urls);
      setStats({
        totalUrls: userData.totalUrls,
        totalVisitors: userData.totalVisitorCount,
      });
      toast.success('Data updated!');
    } catch (error) {
      toast.error('Failed to update data');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1c1f26] p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Total Links</h3>
                <LinkIcon className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalUrls}</p>
            </div>
            <div className="bg-[#1c1f26] p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-300">Total Clicks</h3>
                <BarChart2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalVisitors}</p>
            </div>
          </div>
          <div className="bg-[#1c1f26] rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between">
              <h2 className="text-xl font-semibold text-white">Your Links</h2>
              <button className=' bg-rose-700 hover:bg-rose-600 text-sm font-normal transition-all  dark:text-white  py-1 px-4 rounded-sm mr-4 flex items-center space-x-2 whitespace-nowrap' 
              onClick={()=>setShowPopupModal(true)}>     
                <span className="flex flex-row items-center ">Create Link  <PlusIcon className='h-4'/></span>
               
              </button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Original URL</TableHead>
                    <TableHead className="text-gray-300">Short URL</TableHead>
                    <TableHead className="text-gray-300">Clicks</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urls.map((url: any) => (
                    <TableRow key={url.shortID} onClick={()=> {navigate(`/url/${url.shortID}`)} } className="border-gray-800">
                      <TableCell className="text-gray-300">
                        <div className="flex items-center space-x-2">
                          <span className="truncate max-w-[300px]">{url.redirectURL}</span>
                          <a 
                            href={url.redirectURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center space-x-2">
                          <span>{url.shortID}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) =>{e.stopPropagation(); handleCopy(url.shortID)}}
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{url.visitorCount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          url.isActive 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {url.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation(); setshortId(url.shortID); setShowEditUrlModal(true); 
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) =>{ e.stopPropagation(); setShowDeleteUrlModal(true); setshortId(url.shortID)}}
                            className="text-gray-400 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 " />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/url/${url.shortID}`)
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <BarChart2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
    {showPopupModal && <Createurl forUpdate={false} onClose={()=> { setShowPopupModal(false); refetchData();}}/>}
    {showDeleteUrlModal && <DeleteUrl shortId={shortId} onClose= {()=> {setShowDeleteUrlModal(false);refetchData();}}/>}  
    {showEditUrlModal && <Createurl forUpdate={true} shortId={shortId} onClose={() => { setShowEditUrlModal(false); refetchData(); }} />}
    </>
  );
};

export const loader = async () => {
  try {
    const response = await getUserUrls();
    const userData = response.data.Response[0];
    console.log(userData);
    return {
      urls: userData.urls,
      stats: {
        totalUrls: userData.totalUrls,
        totalVisitors: userData.totalVisitorCount,
      },
    };
  } catch (error) {
    throw new Response('Failed to fetch URLs', { status: 500 });
  }
};

export default Dashboard;

