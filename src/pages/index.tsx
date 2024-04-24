import { useProducts } from '../hooks/productHooks';
import Header from '../components/organisms/Header';
import { ProductTable } from '../components/molecules/ProductTable';
import { Product } from '../types/types';

export default function Home() {
  const { data: products, isLoading, error } = useProducts({ offset: 0, limit: 5, title: '' });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>An error occurred: {error.message}</div>;

  const productsArray = products as Product[];

  return (
    <main>
      <Header />
      <ProductTable products={productsArray} />
    </main>
  );
}
