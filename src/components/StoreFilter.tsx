
import React from "react";
import { Heart } from "lucide-react"; // Keep Heart icon

interface StoreFilterProps {
  selectedStores: string[];
  onStoreChange: (stores: string[]) => void;
}

const StoreFilter: React.FC<StoreFilterProps> = ({
  selectedStores,
  onStoreChange,
}) => {
  // Sample stores, can be fetched or passed as a prop
  const stores = [
    "Macy's",
    "Amazon",
    "Target",
    "Walmart",
    "Best Buy",
    "Nordstrom",
    "Kohl's",
    "Gap",
    "Old Navy",
    "Zappos",
  ];

  const handleStoreToggle = (store: string) => {
    const updated = selectedStores.includes(store)
      ? selectedStores.filter((s) => s !== store)
      : [...selectedStores, store];
    onStoreChange(updated);
  };

  const isAllStoresSelected = selectedStores.length === 0 || selectedStores.length === stores.length;
  // If you want "ALL STORES" to be visually distinct only when no specific store is picked:
  // const isAllStoresEffectivelySelected = selectedStores.length === 0;


  return (
    <div className="w-[300px] bg-card rounded-xl p-5 shadow-lg h-fit sticky top-[100px]"> {/* Added sticky positioning */}
      <h3 className="text-base font-semibold mb-5 text-foreground">
        Show Clearance deals from
      </h3>

      {/* ALL STORES Button */}
      <div
        onClick={() => onStoreChange([])} // Empty array means all stores (no filter)
        className={`text-center p-3.5 rounded-lg mb-5 cursor-pointer transition-colors
          ${isAllStoresSelected
            ? 'bg-[hsl(var(--promo-zara-bg))] text-white font-semibold'
            : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
      >
        ALL STORES
      </div>

      {/* Store List */}
      <ul className="list-none">
        {stores.map((store) => {
          const isSelected = selectedStores.includes(store);
          return (
            <li
              key={store}
              className="flex justify-between items-center py-3.5 border-b border-[hsl(var(--store-item-border))] last:border-b-0"
            >
              <span
                onClick={() => handleStoreToggle(store)}
                className={`text-sm text-foreground cursor-pointer hover:text-primary transition-colors ${
                  isSelected ? "text-primary font-medium" : ""
                }`}
              >
                {store}
              </span>
              <button
                onClick={() => handleStoreToggle(store)} // Or a separate favorite handler
                className="p-1 text-primary"
                aria-label={isSelected ? `Unselect ${store}` : `Select ${store}`}
              >
                <Heart size={18} fill={isSelected ? "currentColor" : "none"} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StoreFilter;
