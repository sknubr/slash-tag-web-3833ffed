
import React from "react";
import { ExternalLink, Star, Clock, Heart, Tag, TrendingUp } from "lucide-react";

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
    <div className="deals-card group overflow-hidden">
      {/* Deal Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img 
          src={deal.image} 
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {discountPercent && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            <Tag size={14} />
            <span>-{discountPercent}%</span>
          </div>
        )}
        
        {deal.timeLeft && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <Clock size={12} />
            <span>{deal.timeLeft}</span>
          </div>
        )}

        {/* Wishlist button */}
        <button className="absolute bottom-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart size={16} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Deal Content */}
      <div className="p-5 space-y-4">
        {/* Store badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            {deal.store}
          </span>
          {discountPercent && discountPercent >= 50 && (
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp size={14} />
              <span className="text-xs font-semibold">Hot Deal</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {deal.title}
        </h3>
        
        {/* Price section */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{deal.price}</span>
            {deal.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{deal.originalPrice}</span>
            )}
          </div>
          
          {discountPercent && (
            <div className="text-sm font-medium text-green-600">
              You save ${(parseFloat(deal.originalPrice?.replace('$', '') || '0') - parseFloat(deal.price.replace('$', ''))).toFixed(2)}
            </div>
          )}
        </div>

        {/* Rating */}
        {deal.rating && (
          <div className="flex items-center space-x-2">
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

        {/* Action button */}
        <a 
          href={deal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full deals-button-primary flex items-center justify-center space-x-2 group-hover:shadow-lg"
        >
          <span>View Deal</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default DealCard;
