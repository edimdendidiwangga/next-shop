import React, { useState } from 'react';
import { useProducts } from '../hooks/productHooks';
import Header from '../components/organisms/Header';
import { ProductTable } from '../components/molecules/ProductTable';

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const pageSize = 5; // Set the number of items per page

  const { data: products, isLoading, error, isFetching } = useProducts({
    offset: pageIndex * pageSize,
    limit: pageSize,
    title: searchTitle
  });

  const handlePreviousPage = () => {
    setPageIndex(Math.max(0, pageIndex - 1)); // Prevent going below page 0
  };

  const handleNextPage = () => {
    if (products && products.length === pageSize) {
      setPageIndex(pageIndex + 1); // Only allow next if a full page is filled
    }
  };

  const safeProducts = products || []; // Ensure products is always an array

  return (
    <main>
      <Header />
      <div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
            setPageIndex(0); // Reset to the first page with new search
          }}
        />
      </div>
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : error ? (
        <div>An error occurred: {error.message}</div>
      ) : (
        <>
          <ProductTable products={safeProducts} />
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={pageIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={safeProducts.length < pageSize}>
              Next
            </button>
            <span>Page {pageIndex + 1}</span>
          </div>
        </>
      )}
    </main>
  );
}
