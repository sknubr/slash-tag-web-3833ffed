
import React from "react";
import DealCard from "./DealCard";

interface Deal {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  store: string;
  rating?: number;
  reviewCount?: number;
  timeLeft?: string;
  url: string;
}

interface DealGridProps {
  deals: Deal[];
  loading?: boolean;
}

const DealGrid: React.FC<DealGridProps> = ({ deals, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg animate-pulse">
            <div className="aspect-square bg-gray-300 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No deals found</div>
        <div className="text-gray-400">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealGrid;
