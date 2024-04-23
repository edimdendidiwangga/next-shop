import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Product } from '@/types/types';

type ProductTableProps = {
  products: Product[];
};

type CellFunctionInfo<T> = {
  getValue: () => T;
};

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'categoryId',
      header: 'Category ID',
    },
    {
      accessorKey: 'images',
      header: 'Images',
      cell: (info: CellFunctionInfo<string[]>) => (
        <img src={info.getValue()[0]} alt="" style={{ width: 50 }} />
      )
    }
  ], []);

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
