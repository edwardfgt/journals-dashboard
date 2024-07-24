import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@tremor/react';
import { HomeIcon, ListBulletIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Journals.gg</h2>
        <p className="text-gray-400 text-sm">Admin</p>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={HomeIcon} className="w-5 h-5 mr-2" />
              Overview
            </Link>
          </li>
          <li>
            <Link to="/revenue" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={ListBulletIcon} className="w-5 h-5 mr-2" />
              Revenue
            </Link>
          </li>
          <li>
            <Link to="/newsletter-health" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={Cog6ToothIcon} className="w-5 h-5 mr-2" />
              Newsletter Health
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;