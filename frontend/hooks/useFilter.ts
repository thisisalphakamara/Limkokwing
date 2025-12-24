import { useState, useMemo, useCallback } from 'react';

export type FilterValue = string | number | boolean;

interface UseFilterOptions<T> {
  data: T[];
  filterFn: (item: T, filterValue: FilterValue) => boolean;
}

export const useFilter = <T>({ data, filterFn }: UseFilterOptions<T>) => {
  const [filterValue, setFilterValue] = useState<FilterValue>('all');

  const memoizedFilterFn = useCallback(filterFn, []);

  const filteredData = useMemo(() => {
    if (filterValue === 'all') return data;
    return data.filter((item) => memoizedFilterFn(item, filterValue));
  }, [data, filterValue, memoizedFilterFn]);

  return {
    filterValue,
    setFilterValue,
    filteredData
  };
};
