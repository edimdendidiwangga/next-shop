import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useProducts } from '../hooks/productHooks';
import Header from '../components/organisms/Header';
import { ProductTable } from '../components/molecules/ProductTable';
import Cart from '../components/molecules/Cart';

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const pageSize = 5; 

  const { data: products, isLoading, error, isFetching } = useProducts({
    offset: pageIndex * pageSize,
    limit: pageSize,
    title: searchTitle
  });

  const handlePreviousPage = () => {
    setPageIndex(Math.max(0, pageIndex - 1));
  };

  const handleNextPage = () => {
    if (products && products.length === pageSize) {
      setPageIndex(pageIndex + 1); 
    }
  };

  const safeProducts = products || [];

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <Cart />
        <div className="mb-4">
          <Input.Search
            placeholder="Search by title..."
            enterButton="Search"
            size="large"
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
              setPageIndex(0);
            }}
          />
        </div>
        {isLoading || isFetching ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">An error occurred: {error.message}</div>
        ) : (
          <>
            <ProductTable products={safeProducts} />
            <div className="pagination flex justify-between items-center mt-4">
              <Button type="primary" onClick={handlePreviousPage} disabled={pageIndex === 0}>
                Previous
              </Button>
              <span>Page {pageIndex + 1}</span>
              <Button type="primary" onClick={handleNextPage} disabled={safeProducts.length < pageSize}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
