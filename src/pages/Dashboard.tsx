import { useState, useEffect } from 'react';
import { getUserUrls, deleteUrl, toggleUrlStatus, updateUrl } from '../api/urlApi';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'react-hot-toast';
import { 
  BarChart2, 
  Pencil, 
  Trash2, 
  Link as LinkIcon,
  ExternalLink,
  Copy
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUrls: 0, totalVisitors: 0 });

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await getUserUrls();
      const userData = response.data.Response[0];
      setUrls(userData.Url);
      setStats({
        totalUrls: userData.totalUrls,
        totalVisitors: userData.totalVisitorCount
      });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch URLs');
      setLoading(false);
    }
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    toast.success('URL copied to clipboard!');
  };

  const handleDelete = async (shortId: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await deleteUrl(shortId);
        toast.success('URL deleted successfully');
        fetchUrls();
      } catch (error) {
        toast.error('Failed to delete URL');
      }
    }
  };

  const handleUpdate = async (shortId: string, newUrl: string) => {
    try {
      await updateUrl(shortId, newUrl);
      toast.success('URL updated successfully');
      fetchUrls();
    } catch (error) {
      toast.error('Failed to update URL');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Section */}
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

      {/* URLs Table */}
      <div className="bg-[#1c1f26] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Your Links</h2>
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
                <TableRow key={url.shortID} className="border-gray-800">
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
                        onClick={() => handleCopy(url.shortID)}
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
                        onClick={() => {
                          const newUrl = prompt('Enter new URL:', url.redirectURL);
                          if (newUrl) handleUpdate(url.shortID, newUrl);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(url.shortID)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toast.success('Analytics feature coming soon!');
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
    </div>
  );
};

export default Dashboard;

