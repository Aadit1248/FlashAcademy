'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Location {
  id: string;
  name: string;
  clayCourts: number;
  miniCourts: number;
  openTime: string;
  closedTime: string;
}

interface VenueFiltersProps {
  locations: Location[];
  currentSearch?: string;
  currentCourtType?: string;
  currentSort?: string;
}

export function VenueFilters({ 
  currentSearch = '', 
  currentCourtType = '', 
  currentSort = '' 
}: VenueFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(currentSearch);
  const [courtType, setCourtType] = useState(currentCourtType);
  const [sort, setSort] = useState(currentSort);

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (search.trim()) params.set('search', search.trim());
    if (courtType) params.set('courtType', courtType);
    if (sort) params.set('sort', sort);
    
    startTransition(() => {
      router.push(`/venues${params.toString() ? `?${params.toString()}` : ''}`);
    });
  };

  const clearFilters = () => {
    setSearch('');
    setCourtType('');
    setSort('');
    startTransition(() => {
      router.push('/venues');
    });
  };

  const hasFilters = currentSearch || currentCourtType || currentSort;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search venues by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className="w-full"
          />
        </div>
        
        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <select 
              value={courtType}
              onChange={(e) => setCourtType(e.target.value)}
              className="rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20 bg-white"
            >
              <option value="">All Court Types</option>
              <option value="clay">Clay Courts</option>
              <option value="mini">Mini Courts</option>
            </select>
            
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-gray-200 px-6 py-3 focus:outline-none focus:border-[#1a472a] focus:ring-2 focus:ring-[#1a472a]/20 bg-white"
            >
              <option value="">Sort By</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
              <option value="-clayCourts">Most Clay Courts</option>
              <option value="-miniCourts">Most Mini Courts</option>
            </select>
          </div>
          
          <div className="flex gap-3">
            {hasFilters && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                disabled={isPending}
              >
                Clear
              </Button>
            )}
            <Button 
              variant="volt" 
              onClick={applyFilters}
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Searching...
                </span>
              ) : (
                'Apply Filters'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
