import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store';
import { LinkIcon , PlusIcon} from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import Createurl from './Modals/Createurl';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopupModal, setShowPopupModal] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return(
    <>
  <header className='bg-transparent backdrop-filter backdrop-blur-md text-gray-900 top-0 dark:text-white sticky z-10 border-b border-gray-200 dark:border-gray-800'>
    <div className='mx-auto md:py-2 py-4 px-4 flex flex-col md:flex-row justify-between items-center'>
      <div className="flex justify-between w-full">
        <NavLink to="/" className="flex items-center space-x-2">
          <LinkIcon className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold">BitLink</span>
        </NavLink>
        <div className="md:hidden flex items-center ">     
          { isAuthenticated && <button className='border-blue-400 border-[1px] py-1 px-4 rounded-lg mr-4 flex items-center space-x-2 whitespace-nowrap' 
          onClick={()=>setShowPopupModal(true)}>     
          <span className="text-sm font-normal transition-colors dark:text-gray-300 dark:hover:text-white text-gray-600">Create Link</span>
          <PlusIcon className='h-4'/>
          </button>
          }
          <ThemeToggle />
          <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} onClick={toggleMenu} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"  />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </div>
      </div> 
      <div className={`lg:flex md:flex lg:flex-1 items-center justify-end font-normal ${isMenuOpen ? 'absolute top-16 left-0 w-full bg-white dark:bg-zinc-950 transition-all duration-300' : 'hidden'} md:block`}>
        <div className='hidden md:flex items-center whitespace-nowrap flex-nowrap flex-col'>
          { isAuthenticated && <button className='border-blue-400 border-[1px] py-1 px-4 rounded-lg mr-4 flex items-center space-x-2 whitespace-nowrap' 
        onClick={()=>{
          setShowPopupModal(true)
        }}
        >
        <span className="text-sm font-normal transition-colors dark:text-gray-300 dark:hover:text-white text-gray-600">Create Link</span>
           <PlusIcon className='h-4'/>
          </button>
          }
        </div>
        <div className="hidden md:block mr-4 pt-2" >
            <ThemeToggle/>
        </div>
        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
                 <li><NavLink to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</NavLink></li>
                 <li><NavLink to="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</NavLink></li>
                 {isAuthenticated ? (
                   <>
                     <li><NavLink to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</NavLink></li>
                     <li>
                       <Button 
                         onClick={handleLogout} 
                         variant="ghost" 
                         className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                       >
                         Logout
                       </Button>
                     </li>
                   </>
                 ) : (
                   <>
                     <li>
                       <Button 
                         variant="ghost" 
                         className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
                         onClick={() => navigate('/login')}
                       >
                         Log in
                       </Button>
                     </li>
                     <li>
                       <Button 
                         className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                         onClick={() =>  navigate('/signup')}
                       >
                         Sign up
                       </Button>
                     </li>
                   </>
                 )}
        </ul>
      </div>
    </div>
  </header>
  <section id='ShortenLinkPage'>
  {showPopupModal && <Createurl forUpdate={false} onClose={()=> setShowPopupModal(false)}/>}
  </section>
  </>
  )
  //      <header className='bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white sticky z-50 border-b border-gray-200 dark:border-gray-800'>
  //         <div className='mx-auto py-4 px-4 flex justify-between items-center '>
  //           <Link to="/" className="flex items-center space-x-2">
  //            <LinkIcon className="w-8 h-8 text-blue-500" />
  //             <span className="text-2xl font-bold">BitLink</span>
  //           </Link>
            
  //           <div className="md:absolute md:right-1/3 flex gap-10">
  //            <ThemeToggle />
  //            {isMenuOpen ? (
  //              <svg className="w-6 h-6 md:hidden" onClick={toggleMenu} fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  //              </svg>
  //            ) : (
  //              <svg className="w-6 h-6 md:hidden" onClick={toggleMenu}  fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  //              </svg>
  //            )}
  //           </div>
            
  //           <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
  //                <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
                 
  //                <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link></li>
  //                <li><Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link></li>
  //                {isAuthenticated ? (
  //                  <>
  //                    <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link></li>
  //                    <li>
  //                      <Button 
  //                        onClick={handleLogout} 
  //                        variant="ghost" 
  //                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
  //                      >
  //                        Logout
  //                      </Button>
  //                    </li>
  //                  </>
  //                ) : (
  //                  <>
  //                    <li>
  //                      <Button 
  //                        variant="ghost" 
  //                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
  //                        onClick={() => window.location.href = '/login'}
  //                      >
  //                        Log in
  //                      </Button>
  //                    </li>
  //                    <li>
  //                      <Button 
  //                        className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
  //                        onClick={() => window.location.href = '/signup'}
  //                      >
  //                        Sign up
  //                      </Button>
  //                    </li>
  //                  </>
  //                )}
  //              </ul>
  //           </div>
  //         </div>
  //      </header>
  // )
  // return (
  //   <header className="bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
  //     <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
  //       <Link to="/" className="flex items-center space-x-2">
  //         <LinkIcon className="w-8 h-8 text-blue-500" />
  //         <span className="text-2xl font-bold">BitLink</span>
  //       </Link>
  //       <nav className={`md:block ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-white dark:bg-[#0f1117] w-full md:w-auto`}>
  //         <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
  //           <li><ThemeToggle /></li>
  //           <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link></li>
  //           <li><Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link></li>
  //           {isAuthenticated ? (
  //             <>
  //               <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link></li>
  //               <li>
  //                 <Button 
  //                   onClick={handleLogout} 
  //                   variant="ghost" 
  //                   className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
  //                 >
  //                   Logout
  //                 </Button>
  //               </li>
  //             </>
  //           ) : (
  //             <>
  //               <li>
  //                 <Button 
  //                   variant="ghost" 
  //                   className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white whitespace-nowrap"
  //                   onClick={() => window.location.href = '/login'}
  //                 >
  //                   Log in
  //                 </Button>
  //               </li>
  //               <li>
  //                 <Button 
  //                   className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
  //                   onClick={() => window.location.href = '/signup'}
  //                 >
  //                   Sign up
  //                 </Button>
  //               </li>
  //             </>
  //           )}
  //         </ul>
  //       </nav>
  //     </div>
  //   </header>
  // );
};

export default Header;

