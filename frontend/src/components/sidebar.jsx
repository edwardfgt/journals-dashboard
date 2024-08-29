import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@tremor/react';
import { HomeIcon, ChartBarIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../App';

const Sidebar = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="w-64 bg-tremor-background dark:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Agency Dashboard</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:text-tremor-brand dark:hover:text-dark-tremor-brand">
              <Icon icon={HomeIcon} className="w-5 h-5 mr-2" />
              Overview
            </Link>
          </li>
          <li>
            <Link to="/revenue" className="flex items-center text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:text-tremor-brand dark:hover:text-dark-tremor-brand">
              <Icon icon={ChartBarIcon} className="w-5 h-5 mr-2" />
              Revenue
            </Link>
          </li>
          <li>
            <Link to="/newsletter-health" className="flex items-center text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:text-tremor-brand dark:hover:text-dark-tremor-brand">
              <Icon icon={NewspaperIcon} className="w-5 h-5 mr-2" />
              Newsletter Health
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;