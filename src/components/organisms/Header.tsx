import React from 'react';
import Button from '../atoms/Button';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl">Next Shop</h1>
      <Button onClick={() => console.log('Logged out')}>Logout</Button>
    </header>
  );
};

export default Header;
