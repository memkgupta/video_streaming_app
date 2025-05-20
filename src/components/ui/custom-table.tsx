import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

import { Input } from './input';
import { TableBody, TableCell, TableHeader, TableRow } from './table';
import Loader from '@/components/layout/Loader';

export interface FilterState {
  [key: string]: any;
}

interface TableProps<T> {
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  sortable?: string[];
  hasNextPage?:boolean
  hasPreviousPage?:boolean;
  filterable?: {
    label: string;
    options?: { value: string; label: string; id: string }[];
    type: string;
  }[];
  pagination?: boolean;
  manualPagination?: boolean;
  pageSize?: number;
  onPageChange?: (info: { pageNumber: number; totalResults: number }) => void;
  totalResults?: number;
  filterState?: FilterState;
  handleFilterStateChange?: (name: string, value: any) => void;
}

export function CustomTable<T>({
  data,
  totalResults = 0,
  isLoading,
  columns,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
  sortable = [],
  filterable = [],
  pagination = false,
  manualPagination = true,
  pageSize = 10,
  handleFilterStateChange,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);

  const pageCount = useMemo(() => Math.ceil(totalResults / pageSize), [totalResults, pageSize]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination,
    rowCount: totalResults,
    pageCount,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.({ pageNumber: newPage, totalResults });
  };

  return (
    <div className="p-4">
      {/* Filters */}
      {filterable.length > 0 && handleFilterStateChange && (
        <div className="mb-4 flex gap-4 flex-wrap">
          {filterable.map((filter) => (
            <FilterInput
              key={filter.label}
              type={filter.type}
              label={filter.label}
              options={filter.options}
              onFilterChange={handleFilterStateChange}
            />
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-left">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ArrowUpIcon className="w-4 h-4" />,
                        desc: <ArrowDownIcon className="w-4 h-4" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {manualPagination && totalResults > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={hasPreviousPage!=undefined?!hasPreviousPage:page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </button>

          

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={hasNextPage!=undefined ?!hasNextPage :page === pageCount}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>

          <div>
            Page <strong>{page}</strong> of <strong>{pageCount}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// FilterInput component
export function FilterInput({
  type,
  label,
  onFilterChange,
  options,
}: {
  type: string;
  label: string;
  onFilterChange: (name: string, value: string) => void;
  options?: { value: string; label: string; id: string }[];
}) {
  switch (type) {
    case 'text':
      return (
        <Input
          type="text"
          placeholder={label}
          className="w-48"
          onChange={(e) => onFilterChange(label, e.target.value)}
        />
      );
    case 'select':
      return (
        <select
          onChange={(e) => onFilterChange(label, e.target.value)}
          className="w-48 bg-slate-950 text-white rounded-md p-2"
        >
          <option value="">All</option>
          {options?.map((opt) => (
            <option value={opt.value} key={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}
