import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { signupUser } from '@/api/userApi';
const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading]  = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signupUser({fullname, username, email, password} );
      toast.success('Account created successfully!');
      navigate('/login');
      setLoading(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create account.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 b">
      <h1 className="text-3xl font-bold mb-6 text-center  dark:text-white">Create Account</h1>
      <div className="dark:bg-[#1c1f26] bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSignup} className="space-y-4 ">
          <div>
            <label htmlFor="fullname" className="block mb-1.5 dark:text-gray-300 text-black text-sm">Full Name</label>
            <Input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="dark:bg-[#2c2f36] border-gray-700  outline-transparent "
              placeholder="John Doe"
            />
          </div>
          <div> 
            <label htmlFor="username" className="block mb-1.5 dark:text-gray-300 text-black text-sm">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="dark:bg-[#2c2f36] border-gray-700 text-white"
              placeholder="johndoe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1.5 dark:text-gray-300 text-black text-sm">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="dark:bg-[#2c2f36] border-gray-700 text-white"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1.5 dark:text-gray-300 text-black text-sm">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark:bg-[#2c2f36] border-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
            {loading ? "Signing up...":"Create Account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

