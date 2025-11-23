'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { WorkbookGrid } from '@/components/workbooks/WorkbookGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { workbooksApi } from '@/lib/api/workbooks';
import { Workbook } from '@/lib/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';

export default function WorkbooksPage() {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [niche, setNiche] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const limit = 12;

  useEffect(() => {
    loadWorkbooks();
  }, [page, search, niche, sortBy]);

  async function loadWorkbooks() {
    try {
      setLoading(true);
      const response = await workbooksApi.list({
        page,
        limit,
        search: search || undefined,
        niche: niche || undefined,
        sortBy,
      });
      setWorkbooks(response.data);
      setTotal(response.pagination.total);
    } catch (error) {
      console.error('Failed to load workbooks:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadWorkbooks();
  };

  const clearFilters = () => {
    setSearch('');
    setNiche('');
    setSortBy('createdAt');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <Container>
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="font-heading font-extrabold text-heading-lg text-dark mb-4">
            Browse Workbooks
          </h1>
          <p className="font-body text-body-lg text-dark/70">
            Discover premium educational workbooks created by expert educators
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-fade-in-up animate-delay-100">
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark/40" />
                <Input
                  type="text"
                  placeholder="Search workbooks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 shadow-soft mb-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-extrabold text-lg text-dark">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5 text-dark/60 hover:text-dark" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-subheading font-medium text-sm text-dark">
                    Niche/Category
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full h-12 rounded-lg border-2 border-grayblue bg-white px-4 font-body text-dark"
                  >
                    <option value="">All Categories</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="History">History</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-subheading font-medium text-sm text-dark">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-12 rounded-lg border-2 border-grayblue bg-white px-4 font-body text-dark"
                  >
                    <option value="createdAt">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(search || niche) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body text-sm text-dark/60">Active filters:</span>
              {search && (
                <span className="inline-flex items-center gap-2 bg-blue/10 text-blue px-3 py-1 rounded-full text-sm font-subheading">
                  Search: {search}
                  <button onClick={() => setSearch('')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {niche && (
                <span className="inline-flex items-center gap-2 bg-lavender/50 text-dark px-3 py-1 rounded-full text-sm font-subheading">
                  {niche}
                  <button onClick={() => setNiche('')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 animate-fade-in-up animate-delay-200">
          <p className="font-body text-dark/70">
            Showing {workbooks.length} of {total} workbooks
          </p>
        </div>

        {/* Workbooks Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="animate-fade-in-up animate-delay-300">
            <WorkbookGrid workbooks={workbooks} />
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="mt-12 flex justify-center gap-2 animate-fade-in-up">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex items-center px-4 font-body text-dark">
              Page {page} of {Math.ceil(total / limit)}
            </div>
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / limit)}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}