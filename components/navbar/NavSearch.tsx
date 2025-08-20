'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect, useCallback } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');

  // Синхронізація з URL параметрами
  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    setSearch(searchValue);
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((value: string) => {
    try {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value && value.trim()) {
        params.set('search', value.trim());
      } else {
        params.delete('search');
      }
      
      // Створення нового URL
      const newUrl = `${pathname}?${params.toString()}`;
      
      // Логування для діагностики
      console.log('Search triggered:', {
        value,
        params: params.toString(),
        newUrl
      });
      
      router.replace(newUrl);
    } catch (error) {
      console.error('Search error:', error);
    }
  }, 300);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  }, [handleSearch]);

  return (
    <Input
      type="search"
      placeholder="Пошук товарів..."
      className="max-w-xs dark:bg-muted"
      onChange={handleInputChange}
      value={search}
      aria-label="Пошук товарів"
    />
  );
}

export default NavSearch;