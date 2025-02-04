import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { shortenUrl } from '../api/urlApi';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion'; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Copy } from 'lucide-react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isAuthenticated) return toast.error("signup to generate url");
    try {
      const response = await shortenUrl(url);
      console.log(response.data.shortID);
      setShortUrl(response.data.shortID);
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to shorten URL. Please try again.');
    }
  };
  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white py-28 mb-0 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Allow people find you on{' '}
            <span className="text-gray-400">the internet. Superfast!</span>
          </h1>
          <p className="text-lg mb-8 text-gray-400">
            Say good bye to long, cumbersome URLs and hello to a simpler, sleeker
            way to shorten, share and manage your links with great analytics.
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter link to be shortened"
                required
                className="dark:bg-[#1c1f26] dark:border-0 border-0 bg-slate-200 flex-1 dark:text-white"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Shorten link
              </Button>
            </div>
          </form>
          {!isAuthenticated && (
        <p className="mt-8 text-center">
          <a href="/signup" className="text-blue-600 hover:underline">Sign up</a> to access more features and track your links!
        </p>
      )}
        </div>
      </section>
       {/* Results Section */}
       {shortUrl && (
        <div className="max-w-2xl mx-auto mt-0 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Your shortened URL:</p>
          <a
            href={`${import.meta.env.VITE_API_URL}/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {`${import.meta.env.VITE_API_URL}/${shortUrl}`}
          </a>
          <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(shortUrl)}
              className="text-blue-500 hover:text-blue-400"
            >
           <Copy className="w-4 h-4" />
           </Button>
        </div>
      )}
      <section className="py-20 dark:bg-[#0f1117] bg-white relative mt-0 ">
      
        <div className="absolute dark:bottom-0 sm:left-1/3 left-7 top-0  dark:w-96 w-48 dark:h-96 h-48 dark:bg-blue-500/20 bg-gray-100 rounded-full filter blur-[128px]" />
        <div className="absolute top-0 sm:right-1/4 right-5 dark:w-96 w-48 dakr:h-96 h-48 dark:bg-purple-500/20 bg-gray-100 rounded-full filter blur-[128px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#21272a] dark:text-white">Why Choose BitLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <div className="relative bg-gray-50  shadow-sm light:shadow-blue-200 dark:bg-[#1c1f26] p-6 rounded-xl">
                  <div className="w-12 h-12 mb-4 text-blue-500 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[0f1117] group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-[#0f1117] relative">
        
        <div className="absolute top-0 sm:left-1/3 left-7  w-96 h-96 bg-blue-500/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 sm:right-1/4 right-5 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[128px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Users Say</h2>
          <div className="relative ">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-500'
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            modules={[Pagination, Autoplay, Navigation]}
            navigation={true}
            className="pb-12 px-10"
            >           
           {testimonials.map((testimonial, index) => (
             <SwiperSlide key={index}>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 viewport={{ once: true }}
                 className="h-full"
               >
                 <div className="bg-white dark:bg-[#1c1f26] p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                   <div className="flex items-center mb-4">
                     <img
                       src={testimonial.avatar}
                       alt={testimonial.name}
                       className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500/20"
                     />
                     <div>
                       <h4 className="font-semibold text-white">{testimonial.name}</h4>
                       <p className="text-gray-400 text-sm">{testimonial.role}</p>
                     </div>
                   </div>
                   <p className="text-gray-300 mb-4 italic flex-grow">"{testimonial.content}"</p>
                   <div className="flex items-center text-yellow-400">
                     {[...Array(5)].map((_, i) => (
                       <svg
                         key={i}
                         className="w-4 h-4 fill-current"
                         viewBox="0 0 20 20"
                       >
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                     ))}
                   </div>
                 </div>
               </motion.div>
             </SwiperSlide>
           ))}
        </Swiper>
        </div>
        </div>
      </section>

    

    
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Sign up now to unlock premium features and take control of your links!
            </p>
            <Button
              onClick={() => window.location.href = '/signup'}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Free Account
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};


const features = [
  {
    title: "Link Analytics",
    description: "Track clicks, geographic data, and referral sources in real-time.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  },
  {
    title: "Custom Links",
    description: "Create branded short links that reflect your identity.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
  },
  {
    title: "QR Codes",
    description: "Generate QR codes for your shortened links instantly.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
  },
];

const testimonials = [
  {
    content: "Bitlink has transformed how we share links with our customers.",
    name: "Nivya Johnson",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    content: "The custom branding feature helps maintain our professional image .",
    name: "Michael Chen",
    role: "Social Media Manager",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    content: "Simple, fast, and reliable. Exactly what we needed for our link management.",
    name: "Emma Williams",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    content: "Thank you for creatively solving the link managemnt Problem",
    name: "Sujain shah",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    content: "Feature rich link management tool really like the UI/UX.",
    name: "Estonia martin",
    role: "Event Organizer",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg"
  },
];

export default Home;