const Footer = () => {
  return (
    <>
    
    <footer className="bg-gray-50 dark:bg-[#0f1117]  text-gray-600 dark:text-gray-400 py-12 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto md:px-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Why BitLink</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Social Media</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Customer Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">For Developers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t w-full border-gray-200 dark:border-gray-800 text-center">
          <p>&copy; 2025 Albatross. All rights reserved .</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
  
  