import React from 'react';
import ProductForm from '../components/molecules/ProductForm';
import { Button } from 'antd';

const CreateProductPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProductPage;
