import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="font-bold text-xl text-gray-800">Next Shop</div>
            </Link>
          </div>
          <div className="hidden sm:block">
            <Menu mode="horizontal" defaultSelectedKeys={['home']}>
              <Menu.Item key="home">
                <Link href="/">
                  Home
                </Link>
              </Menu.Item>
              
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
