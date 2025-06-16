
import React, { useState, useMemo, useEffect } from "react";
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
  const [priceRange, setPriceRange] = useState<{ min: number | string; max: number | string }>({ min: 0, max: 500 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(12); // Show 12 items initially

  const popularCategoryButtons = ['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Beauty & Personal Care', 'Books & Media'];

  const handlePopularCategoryClick = (categoryName: string) => {
    console.log("Popular category clicked:", categoryName);
    const filterValue = categoryName.toLowerCase();
    setSelectedCategories(prev =>
      prev.includes(filterValue)
        ? prev.filter(sc => sc !== filterValue)
        : [...prev, filterValue]
    );
  };

  useEffect(() => {
    console.log("Selected Categories updated:", selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    console.log("Visible Items Count updated:", visibleItemsCount);
  }, [visibleItemsCount]);

  // Filter and sort deals based on current state
  const filteredAndSortedDeals = useMemo(() => {
    console.log("Filtering deals. Current filters:", {
      selectedCategories,
      priceRange,
      selectedStores,
      searchQuery,
    });
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
      // Ensure priceRange.min and priceRange.max are treated as numbers for comparison
      const minPrice = Number(priceRange.min);
      const maxPrice = Number(priceRange.max);
      return price >= minPrice && price <= maxPrice;
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
        return selectedCategories.some(category => { // category is already lowercased
          // Existing FilterSidebar category checks (assuming these are more specific or different)
          if (category.includes('women') || category.includes('dresses') && !popularCategoryButtons.map(pcb => pcb.toLowerCase()).includes(category)) {
            return title.includes('dress') || title.includes('women');
          }
          if (category.includes('men') && !popularCategoryButtons.map(pcb => pcb.toLowerCase()).includes(category)) {
            return title.includes('men') || title.includes('shirt');
          }
          if (category.includes('technology') && !popularCategoryButtons.map(pcb => pcb.toLowerCase()).includes(category)) {
             // This might conflict with 'electronics' if not handled carefully.
             // For now, let FilterSidebar's 'technology' take precedence if it's not 'electronics'.
            return title.includes('phone') || title.includes('laptop') || title.includes('tech');
          }

          // Popular Category Button checks
          if (category === 'electronics') {
            return title.includes('airpods') || title.includes('samsung') || title.includes('tv') || title.includes('sony') || title.includes('headphones') || title.includes('ipad') || title.includes('echo dot') || title.includes('smart speaker') || title.includes('camera') || title.includes('drone') || title.includes('laptop') || title.includes('phone') || title.includes('electronic');
          }
          if (category === 'fashion') {
            return title.includes('nike') || title.includes('shoe') || title.includes('levi\'s') || title.includes('jean') || title.includes('adidas') || title.includes('shirt') || title.includes('dress') || title.includes('air max') || title.includes('ultraboost') || title.includes('women') || title.includes('men\'s') || title.includes('sneaker') || title.includes('fleece');
          }
          if (category === 'home & garden') {
            return title.includes('instant pot') || title.includes('kitchenaid') || title.includes('mixer') || title.includes('dyson') || title.includes('vacuum') || title.includes('ninja foodi') || title.includes('blender') || title.includes('pot') || title.includes('cooker') || title.includes('home') || title.includes('garden') || title.includes('furniture') || title.includes('decor') || title.includes('coffee maker') || title.includes('roomba');
          }
          if (category === 'sports & outdoors') { // More generic matching for these
            return title.includes('sport') || title.includes('outdoor') || title.includes('bike') || title.includes('tent') || title.includes('running') || title.includes('fitness');
          }
          if (category === 'beauty & personal care') {
            return title.includes('beauty') || title.includes('personal care') || title.includes('makeup') || title.includes('perfume') || title.includes('fragrance') || title.includes('skin');
          }
          if (category === 'books & media') {
            return title.includes('book') || title.includes('media') || title.includes('dvd') || title.includes('blu-ray') || title.includes('game') || title.includes('novel');
          }
          // Fallback for categories from FilterSidebar that might not be directly in popularCategoryButtons
          // This ensures that if 'technology' from FilterSidebar is selected, and it's not 'electronics', it still attempts a match.
          if(popularCategoryButtons.map(pcb => pcb.toLowerCase()).includes(category)) return false; // Already handled above
          return title.includes(category); // Generic match for other sidebar categories
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

    console.log("Filtered deals count (before slice):", deals.length);
    return deals;
  }, [searchQuery, sortBy, priceRange, selectedCategories, selectedStores]);

  const dealsToShow = useMemo(() => {
    console.log("dealsToShow: visibleItemsCount =", visibleItemsCount, ", sliced deal count =", filteredAndSortedDeals.slice(0, visibleItemsCount).length);
    return filteredAndSortedDeals.slice(0, visibleItemsCount);
  }, [filteredAndSortedDeals, visibleItemsCount]);

  const handleLoadMore = () => {
    console.log("handleLoadMore: current visibleItemsCount =", visibleItemsCount);
    setVisibleItemsCount(prevCount => {
      const newCount = prevCount + 12;
      console.log("handleLoadMore: new visibleItemsCount =", newCount);
      return newCount;
    });
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    // Removed style={{ backgroundColor: 'var(--deals-background)' }}
    <div className="min-h-screen">
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
            <span className="text-primary"> Clearance Deals</span> {/* Replaced deals-text-primary */}
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
            {popularCategoryButtons.map((category) => {
              const filterValue = category.toLowerCase();
              const isSelected = selectedCategories.includes(filterValue);
              return (
                <button
                  key={category}
                  onClick={() => handlePopularCategoryClick(category)}
                  className={`px-6 py-3 rounded-full transition-all duration-200 font-medium hover:scale-105 ${
                    isSelected
                      ? 'bg-primary/10 text-primary border-2 border-primary' // Selected style
                      : 'bg-card border-2 border-border hover:border-primary/50 hover:bg-primary/5' // Default style
                  }`}
                >
                  {category}
                </button>
              );
            })}
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
              onCategoryChange={(categoryItem) => { // Assuming FilterSidebar now calls onCategoryChange with a single item string
                setSelectedCategories(prev =>
                  prev.includes(categoryItem)
                    ? prev.filter(sc => sc !== categoryItem)
                    : [...prev, categoryItem]
                );
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <FilterBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              // viewMode={viewMode} // viewMode prop removed from FilterBar in previous step
              // onViewModeChange={setViewMode} // onViewModeChange prop removed from FilterBar in previous step
              // totalDeals={filteredAndSortedDeals.length} // totalDeals prop removed from FilterBar in previous step
            />

            {/* Deals Grid */}
            <DealGrid deals={dealsToShow} loading={loading} />

            {/* Load More Button */}
            {visibleItemsCount < filteredAndSortedDeals.length && (
              <div className="text-center mt-16">
                <button
                  onClick={handleLoadMore}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-primary/90"
                >
                  Load More Deals
                </button>
              </div>
            )}
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
              {/* Replaced deals-gradient with bg-primary */}
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Gift className="text-white" size={20} />
              </div>
              {/* Replaced deals-text-primary with text-primary */}
              <h3 className="text-2xl font-bold text-primary">DealsHub</h3>
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
