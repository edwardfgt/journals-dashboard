import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@tremor/react';
import { HomeIcon, ChartBarIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../../App';

const Sidebar = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="w-64 bg-tremor-background dark:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Agency Dashboard</h2>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:text-tremor-brand dark:hover:text-dark-tremor-brand">
              <Icon icon={NewspaperIcon} className="w-5 h-5 mr-2" />
              Newsletter Dashboard
            </Link>
          </li>
          <li>
            <Link to="/revenue" className="flex items-center text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis hover:text-tremor-brand dark:hover:text-dark-tremor-brand">
              <Icon icon={ChartBarIcon} className="w-5 h-5 mr-2" />
              Revenue
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;