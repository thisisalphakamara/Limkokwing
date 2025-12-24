import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  headerClassName?: string;
}

function Table<T extends { id?: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  emptyMessage = 'No data available',
  headerClassName = 'bg-black text-white'
}: TableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  return (
    <div className="bg-white border border-black overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className={`${headerClassName} text-[10px] font-bold uppercase tracking-widest`}>
            {columns.map((column, index) => (
              <th key={index} className={`p-4 ${column.className || ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="p-12 text-center text-gray-400 font-bold uppercase tracking-widest"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={`p-4 ${column.className || ''}`}>
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
