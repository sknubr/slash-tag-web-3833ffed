
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm animate-pulse overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200"></div>
            <div className="p-5 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="text-gray-900 text-xl font-semibold mb-2">No deals found</div>
        <div className="text-gray-500 mb-8">Try adjusting your search or filters to discover more deals</div>
        <button className="deals-button-primary">
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealGrid;
