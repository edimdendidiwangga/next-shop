import { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, Row } from '@tanstack/react-table';
import { Product } from '@/types/types';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/productHooks';

type ProductTableProps = {
  products: Product[];
};

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const columns = useMemo(() => [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'categoryId', header: 'Category ID' },
    {
      accessorKey: 'images',
      header: 'Images',
      cell: (info: { getValue: () => string[] }) => <img src={info.getValue()[0]} alt="" style={{ width: 50 }} />
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<Product> }) => (
        <>
          <button onClick={() => updateProduct.mutate({ id: row.original.id, price: row.original.price + 1 })}>
            Raise Price 
          </button>
          <button onClick={() => deleteProduct.mutate(row.original.id)}>
            Delete
          </button>
        </>
      )
    }
  ], [updateProduct, deleteProduct]);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
