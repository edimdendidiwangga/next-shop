import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import { useProducts } from '../hooks/productHooks';
import { ProductTable } from '../components/molecules/ProductTable';
import { RootState } from '../store/store';

const ProductsPage: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const pageSize = 5;
  const router = useRouter();
  const productsFromStore = useSelector((state: RootState) => state.products.products);

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

  const handleCreateProduct = () => {
    router.push('/create-product');
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
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
        <div className="mb-4">
          <Button type="primary" onClick={handleCreateProduct}>
            Create Product
          </Button>
        </div>
        {isLoading || isFetching ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">An error occurred: {error.message}</div>
        ) : (
          <>
            <ProductTable products={productsFromStore} />
            <div className="pagination flex justify-between items-center mt-4">
              <Button type="primary" onClick={handlePreviousPage} disabled={pageIndex === 0}>
                Previous
              </Button>
              <span>Page {pageIndex + 1}</span>
              <Button type="primary" onClick={handleNextPage} disabled={productsFromStore.length < pageSize}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
