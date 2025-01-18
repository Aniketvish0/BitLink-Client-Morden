import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { loginUser } from '../api/userApi';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      const { user, accessToken } = response.data;
      dispatch(login({ user, accessToken }));
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white text-[#0f1117]">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 dark:bg-[#1c1f26] bg-white shadow-xl p-8 rounded-lg">
        <div>
          <label htmlFor="username" className="block mb-1 dark:text-gray-300 text-[#0f1117]">Username</label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
            className="dark:bg-[#2c2f36] border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 dark:text-gray-300 text-[#0f1117]">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className="dark:bg-[#2c2f36] border-gray-700 "
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
      </form>
    </div>
  );

};

export default Login;

