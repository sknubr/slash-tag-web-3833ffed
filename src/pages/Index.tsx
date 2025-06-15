
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import FilterSidebar from "@/components/FilterSidebar";
import StoreFilter from "@/components/StoreFilter";
import DealGrid from "@/components/DealGrid";
import { sampleDeals } from "@/data/sampleDeals";
import { Zap, Gift, Percent, TrendingUp } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  
  // New filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

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

    // Filter by price range
    deals = deals.filter(deal => {
      const price = parseFloat(deal.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by selected stores
    if (selectedStores.length > 0) {
      deals = deals.filter(deal => 
        selectedStores.some(store => 
          deal.store.toLowerCase().includes(store.toLowerCase())
        )
      );
    }

    // Filter by categories (basic implementation - in real app you'd have category data)
    if (selectedCategories.length > 0) {
      deals = deals.filter(deal => {
        // Simple category matching based on title keywords
        const title = deal.title.toLowerCase();
        return selectedCategories.some(category => {
          if (category.includes('women') || category.includes('dresses')) {
            return title.includes('dress') || title.includes('women');
          }
          if (category.includes('men')) {
            return title.includes('men') || title.includes('shirt');
          }
          if (category.includes('technology')) {
            return title.includes('phone') || title.includes('laptop') || title.includes('tech');
          }
          return false;
        });
      });
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
  }, [searchQuery, sortBy, priceRange, selectedCategories, selectedStores]);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--deals-background)' }}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />
      
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
            <Zap className="text-blue-600 mr-2" size={20} />
            <span className="text-blue-700 font-semibold">Live Deals Updated Every Hour</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the Best 
            <span className="deals-text-primary"> Clearance Deals</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing deals from top retailers. Save up to 80% on electronics, fashion, home goods, and more with our curated collection of clearance sales.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Percent className="text-green-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">Up to 80%</div>
              <div className="text-gray-600">Average Savings</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Gift className="text-blue-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Active Deals</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Partner Stores</div>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Beauty & Personal Care', 'Books & Media'].map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content with Sidebars */}
        <div className="flex gap-6 max-w-[1600px] mx-auto">
          {/* Left Sidebar - Filters */}
          <div className="flex-shrink-0">
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
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
            <div className="text-center mt-16">
              <button className="deals-button-primary">
                Load More Deals
              </button>
            </div>
          </div>

          {/* Right Sidebar - Store Filter */}
          <div className="flex-shrink-0">
            <StoreFilter
              selectedStores={selectedStores}
              onStoreChange={setSelectedStores}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 deals-gradient rounded-xl flex items-center justify-center">
                <Gift className="text-white" size={20} />
              </div>
              <h3 className="text-2xl font-bold deals-text-primary">DealsHub</h3>
            </div>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Your one-stop destination for the best clearance deals online. Save more, shop smarter.</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
            </div>
            <div className="mt-8 text-sm text-gray-400">
              © {new Date().getFullYear()} DealsHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
