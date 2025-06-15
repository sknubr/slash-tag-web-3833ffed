
import React from "react";
import { Filter, SortAsc, Grid, List, Sliders } from "lucide-react";

interface FilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalDeals: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalDeals
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-6">
        <div className="flex items-center space-x-2">
          <Sliders size={18} className="text-blue-600" />
          <span className="font-semibold text-gray-900">
            {totalDeals.toLocaleString()} deals found
          </span>
        </div>
        
        {totalDeals > 0 && (
          <div className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">
            Updated 2 minutes ago
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="Grid view"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            title="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
