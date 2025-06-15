
import React from "react";
import { Heart } from "lucide-react";

interface StoreFilterProps {
  selectedStores: string[];
  onStoreChange: (stores: string[]) => void;
}

const StoreFilter: React.FC<StoreFilterProps> = ({
  selectedStores,
  onStoreChange
}) => {
  const stores = [
    'Macy\'s',
    'Kohls',
    'Target',
    'Neiman Marcus',
    'Nordstrom Rack',
    'Bloomingdales',
    'Belk',
    '6pm',
    'Big Lots',
    'Saks 5th Ave'
  ];

  const handleStoreToggle = (store: string) => {
    const updated = selectedStores.includes(store)
      ? selectedStores.filter(s => s !== store)
      : [...selectedStores, store];
    onStoreChange(updated);
  };

  const isAllSelected = selectedStores.length === 0;

  return (
    <div className="w-72 bg-white border-l border-gray-200 p-4 h-full overflow-y-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Sort</span>
          <button className="text-sm text-gray-600 flex items-center gap-1">
            <span>↕</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Show Clearance deals from</h4>
        
        {/* ALL STORES button */}
        <button
          onClick={() => onStoreChange([])}
          className={`w-full mb-3 px-4 py-2 rounded text-sm font-medium transition-colors ${
            isAllSelected 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ALL STORES
        </button>

        {/* Individual store filters */}
        <div className="space-y-2">
          {stores.map((store) => (
            <div key={store} className="flex items-center justify-between py-2">
              <label className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={selectedStores.includes(store)}
                  onChange={() => handleStoreToggle(store)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{store}</span>
              </label>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Heart size={16} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreFilter;
