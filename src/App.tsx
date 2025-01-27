import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard , { loader as dashboardLoader }   from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './components/ThemeProvider';
import Url from './pages/Url';
import Loader from './components/ui/Loader';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: dashboardLoader,
      },
      { path: 'url/:shortId',
        element:( 
          <ProtectedRoute>
            <Url/>
          </ProtectedRoute>
        )
      },
      { path : "/features",
          element : (
            <div className="h-screen flex justify-center items-center text-4xl">
              Features Page (Coming Soon) 
            </div>
          )
      }
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(savedTheme);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader/>; 
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
          <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117]">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  borderRadius: '1%'
                },
              }}
            />
            <RouterProvider router={router} />
          </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

