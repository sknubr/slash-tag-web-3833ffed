
import React from "react";
import DealCard from "./DealCard"; // Assuming DealCard props are aligned

// The Deal interface should match the one used in DealCard.tsx
// If DealCard.tsx's Deal interface was updated, this should reflect those changes.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {[...Array(12)].map((_, index) => ( // Reduced skeleton items for brevity, can be 20
          <div key={index} className="bg-card rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-[200px] bg-muted"></div> {/* Using themed color for skeleton */}
            <div className="p-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-3"></div> {/* Title placeholder */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-muted rounded w-1/3"></div> {/* Current price placeholder */}
                <div className="h-4 bg-muted rounded w-1/4"></div> {/* Original price placeholder */}
              </div>
            </div>
            <div className="p-4 border-t border-border flex justify-between items-center"> {/* Action section placeholder */}
              <div className="flex gap-2.5">
                <div className="h-8 w-10 bg-muted rounded"></div>
                <div className="h-8 w-10 bg-muted rounded"></div>
              </div>
              <div className="flex gap-2.5">
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          {/* SVG Search Icon - can be replaced with Lucide if preferred */}
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h2 className="text-foreground text-xl font-semibold mb-2">No deals found</h2>
        <p className="text-muted-foreground mb-8">Try adjusting your search or filters to discover more deals.</p>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-primary/90">
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealGrid;
