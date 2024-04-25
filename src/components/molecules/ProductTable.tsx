import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, Row } from '@tanstack/react-table';
import { Button, message } from 'antd';
import { Product } from '@/types/types';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/productHooks';
import { useDispatch } from 'react-redux';
import { addItem } from '../../reducer/slices/cartSlice';

type ProductTableProps = {
  products: Product[];
};

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ product, quantity: 1 }));
    message.success('Product added to cart');
  };

  const toggleDescription = (productId: number) => {
    setExpandedDesc(expandedDesc === productId ? null : productId);
  };

  const columns = useMemo(() => [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'price', header: 'Price' },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }: { row: Row<Product> }) => (
        <>
          {expandedDesc === row.original.id ?
            row.original.description :
            `${row.original.description.substring(0, 100)}...`}
          <Button type="link" onClick={() => toggleDescription(row.original.id)}>
            {expandedDesc === row.original.id ? 'Read Less' : 'Read More'}
          </Button>
        </>
      )
    },
    {
      accessorKey: 'images',
      header: 'Images',
      cell: (info: { getValue: () => string[] }) => (
        <div className="relative w-16 h-16 overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <img src={info.getValue()[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<Product> }) => (
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => updateProduct.mutate({ id: row.original.id, price: row.original.price + 1 })}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Update
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => deleteProduct.mutate(row.original.id)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => handleAddToCart(row.original)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Add to Cart
          </Button>
        </div>
      )
    }
  ], [updateProduct, deleteProduct, dispatch, expandedDesc]);

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
