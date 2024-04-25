import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import CartItemCount from '../molecules/CartItemCount';
import { RootState } from '../../store/store';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="font-bold text-xl text-gray-800">Next Shop</div>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <Menu mode="horizontal" defaultSelectedKeys={['home']}>
              <Menu.Item key="home">
                <Link href="/">
                  Home
                </Link>
              </Menu.Item>
            </Menu>
            <Link href="/carts">
              <div className="flex items-center">
                <CartItemCount />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
