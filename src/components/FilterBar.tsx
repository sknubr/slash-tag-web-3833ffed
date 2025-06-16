
import React from "react";
// Removed Filter, Grid, List, Sliders, SortAsc from lucide-react imports

interface FilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  // Removed viewMode, onViewModeChange, and totalDeals props
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-5">
      {/* Empty div on the left to match sample structure */}
      <div></div>

      {/* Right Side Content (Sort Dropdown) */}
      <div> {/* This div can be removed if select itself aligns correctly with flex justify-between */}
        <select
          id="sort-by-select"
          name="sort-by-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2.5 border border-muted rounded-md bg-card cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Highest Discount</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
