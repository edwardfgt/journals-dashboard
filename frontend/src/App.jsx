import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RevenueDashboard from './components/revenueDashboard'
import Sidebar from './components/sidebar';
import Overview from './components/overview';
import NewsletterHealth from './components/NewsletterHealth';
import { Card, Title } from '@tremor/react';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/login';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div className="flex h-screen w-screen bg-tremor-background dark:bg-dark-tremor-background">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <div className="p-4 md:p-10 max-w-7xl mx-auto">
                <Card className="mb-5">
                  <Title>Agency Dashboard</Title>
                </Card>
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/revenue" element={<RevenueDashboard />} />
                  <Route path="/newsletter-health" element={<NewsletterHealth />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;