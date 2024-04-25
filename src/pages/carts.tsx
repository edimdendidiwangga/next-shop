import React from 'react';
import Cart from '../components/molecules/Cart';

const CreateProductPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded shadow-md">
        <Cart />
      </div>
    </div>
  );
};

export default CreateProductPage;
