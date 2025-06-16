
import React, { useState, useEffect } from "react";
// Removed ChevronDown, ChevronUp, Slider, Accordion components and related imports

interface FilterSidebarProps {
  // priceRange is now an object with min and max, or could be two separate props
  priceRange: { min: number | string; max: number | string };
  onPriceRangeChange: (newRange: { min: number | string; max: number | string }) => void;
  selectedCategories: string[]; // Array of selected category item strings e.g. ["Dresses", "Phones"]
  onCategoryChange: (categoryItem: string) => void; // Called when a list item is clicked
}

// Simplified category structure based on the new design
const filterData = [
  {
    title: "Women",
    items: ["Dresses", "Jeans", "Shoes", "Tops", "Jackets"],
  },
  {
    title: "Men",
    items: ["Shirts", "Jeans", "Shoes", "Suits", "Jackets"],
  },
  {
    title: "Technology",
    items: ["Smartphones", "Laptops", "Headphones", "Cameras", "Drones"],
  },
  {
    title: "Home & Garden",
    items: ["Furniture", "Decor", "Lighting", "Kitchenware", "Gardening"],
  }
];


const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryChange,
}) => {
  // Local state for input fields to allow users to type freely
  const [minPriceInput, setMinPriceInput] = useState<string | number>(priceRange.min);
  const [maxPriceInput, setMaxPriceInput] = useState<string | number>(priceRange.max);

  useEffect(() => {
    setMinPriceInput(priceRange.min);
    setMaxPriceInput(priceRange.max);
  }, [priceRange]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceInput(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceInput(e.target.value);
  };

  // Call onPriceRangeChange when input loses focus or on Enter key
  const handlePriceBlur = () => {
    let newMin = parseFloat(minPriceInput as string);
    let newMax = parseFloat(maxPriceInput as string);
    if (isNaN(newMin)) newMin = 0; // Or keep previous value from prop
    if (isNaN(newMax)) newMax = Infinity; // Or keep previous value from prop
    onPriceRangeChange({ min: newMin, max: newMax });
  };

  const handlePriceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePriceBlur();
      (e.target as HTMLInputElement).blur(); // Optional: remove focus
    }
  };

  const handleCategoryItemClick = (item: string) => {
    onCategoryChange(item); // Parent component will handle adding/removing from selectedCategories
  };

  return (
    <div className="w-[250px] bg-card rounded-xl p-5 shadow-lg h-fit sticky top-[100px]"> {/* Added sticky positioning relative to header */}
      <h3 className="text-base font-semibold mb-4 text-foreground">Filter Results</h3>
      
      {/* Price Filter */}
      <div className="mb-6 filter-section">
        <h4 className="text-sm font-medium mb-2.5 text-foreground">Price</h4>
        <div className="flex items-center gap-2.5 my-2.5">
          <input
            type="text"
            id="min-price-input"
            name="min-price-input"
            placeholder="$10"
            value={minPriceInput}
            onChange={handleMinPriceChange}
            onBlur={handlePriceBlur}
            onKeyPress={handlePriceKeyPress}
            className="w-16 p-2 border border-input rounded text-xs focus:ring-1 focus:ring-ring focus:border-ring outline-none"
          />
          <span className="text-muted-foreground">—</span>
          <input
            type="text"
            id="max-price-input"
            name="max-price-input"
            placeholder="$65"
            value={maxPriceInput}
            onChange={handleMaxPriceChange}
            onBlur={handlePriceBlur}
            onKeyPress={handlePriceKeyPress}
            className="w-16 p-2 border border-input rounded text-xs focus:ring-1 focus:ring-ring focus:border-ring outline-none"
          />
        </div>
      </div>

      {/* Category Filters */}
      {filterData.map((categorySection) => (
        <div key={categorySection.title} className="mb-6 filter-section">
          <h4 className="text-sm font-medium mb-2.5 text-foreground">{categorySection.title}</h4>
          <ul className="list-none">
            {categorySection.items.map((item) => (
              <li
                key={item}
                onClick={() => handleCategoryItemClick(item)}
                className={`py-1.5 text-sm cursor-pointer transition-colors duration-150 rounded-md px-2
                  ${selectedCategories.includes(item)
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
