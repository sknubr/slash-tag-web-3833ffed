import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import DealGrid from "@/components/DealGrid";
import { sampleDeals } from "@/data/sampleDeals";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  // Filter and sort deals based on current state
  const filteredAndSortedDeals = useMemo(() => {
    let deals = [...sampleDeals];

    // Filter by search query
    if (searchQuery.trim()) {
      deals = deals.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.store.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort deals
    switch (sortBy) {
      case 'price-low':
        deals.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'price-high':
        deals.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
      case 'discount':
        deals.sort((a, b) => {
          const discountA = a.originalPrice ? (1 - parseFloat(a.price.replace('$', '')) / parseFloat(a.originalPrice.replace('$', ''))) : 0;
          const discountB = b.originalPrice ? (1 - parseFloat(b.price.replace('$', '')) / parseFloat(b.originalPrice.replace('$', ''))) : 0;
          return discountB - discountA;
        });
        break;
      case 'rating':
        deals.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // newest first - keep original order
        break;
    }

    return deals;
  }, [searchQuery, sortBy]);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Clearance Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing deals from top retailers. Save up to 80% on electronics, fashion, home goods, and more.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Books'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalDeals={filteredAndSortedDeals.length}
        />

        {/* Deals Grid */}
        <DealGrid deals={filteredAndSortedDeals} loading={loading} />

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Deals
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">DealsHub</h3>
            <p className="text-gray-600">Your one-stop destination for the best clearance deals online.</p>
            <div className="mt-6 text-sm text-gray-500">
              © {new Date().getFullYear()} DealsHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
