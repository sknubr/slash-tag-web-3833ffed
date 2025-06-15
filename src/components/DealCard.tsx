
import React from "react";
import { ExternalLink, Star, Clock } from "lucide-react";

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

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const discountPercent = deal.originalPrice && deal.price 
    ? Math.round((1 - parseFloat(deal.price.replace('$', '')) / parseFloat(deal.originalPrice.replace('$', ''))) * 100)
    : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      {/* Deal Image */}
      <div className="relative aspect-square bg-gray-100">
        <img 
          src={deal.image} 
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discountPercent && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{discountPercent}%
          </div>
        )}
        {deal.timeLeft && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
            <Clock size={12} />
            {deal.timeLeft}
          </div>
        )}
      </div>

      {/* Deal Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {deal.title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">{deal.price}</span>
            {deal.originalPrice && (
              <span className="text-gray-500 line-through text-sm">{deal.originalPrice}</span>
            )}
          </div>
        </div>

        {deal.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(deal.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({deal.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">{deal.store}</span>
          <a 
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View Deal
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
