import React from 'react';
import { Icon } from '@tremor/react';
import { HomeIcon, ListBulletIcon, Cog6ToothIcon, UserPlusIcon, ChartBarIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

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
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={HomeIcon} className="w-5 h-5 mr-2" />
              Overview
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={ListBulletIcon} className="w-5 h-5 mr-2" />
              Revenue
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Icon icon={Cog6ToothIcon} className="w-5 h-5 mr-2" />
              Newsletter Health
            </a>
          </li>
        </ul>
      </nav>
      
      
    </div>
  );
};

export default Sidebar;