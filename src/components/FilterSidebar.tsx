
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryChange
}) => {
  const categories = [
    { id: 'women', label: 'Women', subcategories: ['Dresses', 'Shoes', 'Jackets'] },
    { id: 'men', label: 'Men', subcategories: ['Shirts', 'Pants', 'Shoes'] },
    { id: 'technology', label: 'Technology', subcategories: ['Phones', 'Laptops', 'Accessories'] },
    { id: 'home', label: 'Home', subcategories: ['Furniture', 'Decor', 'Kitchen'] },
    { id: 'kids', label: 'Kids', subcategories: ['Clothing', 'Toys', 'Books'] },
    { id: 'fragrances', label: 'Fragrances', subcategories: ['Perfume', 'Cologne', 'Body Spray'] }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updated);
  };

  return (
    <div className="w-56 bg-white border-r border-gray-200 p-4 h-full overflow-y-auto">
      <h3 className="font-semibold text-lg mb-4">Filter</h3>
      
      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={500}
            min={0}
            step={10}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-medium py-3 text-sm">
              {category.label}
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">All {category.label}</span>
                </label>
                {category.subcategories.map((sub) => (
                  <label key={sub} className="flex items-center space-x-2 cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(`${category.id}-${sub.toLowerCase()}`)}
                      onChange={() => handleCategoryToggle(`${category.id}-${sub.toLowerCase()}`)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-600">{sub}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
