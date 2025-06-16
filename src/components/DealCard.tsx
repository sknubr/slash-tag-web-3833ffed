
import React from "react";
// Removed Star, Clock, Heart, Tag, TrendingUp, ExternalLink as they are no longer used or replaced by text/simple icons
// Potential future icons: ThumbsUp, ThumbsDown, Bookmark, ExternalLink, MoreHorizontal

interface Deal {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string; // This will be displayed directly if available
  image: string;
  store: string; // Kept in interface, though not displayed in this card version
  rating?: number; // Kept in interface, though not displayed
  reviewCount?: number; // Kept in interface, though not displayed
  timeLeft?: string; // Kept in interface, though not displayed
  url: string; // Kept for potential use with ↗ button
}

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const discountPercent = deal.discount
    ? deal.discount
    : (deal.originalPrice && deal.price
      ? `${Math.round((1 - parseFloat(deal.price.replace('$', '')) / parseFloat(deal.originalPrice.replace('$', ''))) * 100)}%`
      : null);

  // Placeholder for image if deal.image is not a valid URL or for loading states
  const imageStyle = deal.image
    ? { backgroundImage: `url(${deal.image})` }
    : { backgroundImage: 'linear-gradient(to bottom right, var(--muted), var(--secondary))' };


  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-2xl">
      {/* Product Image */}
      <div
        className="w-full h-[200px] bg-cover bg-center relative"
        style={imageStyle}
        role="img"
        aria-label={deal.title}
      >
        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-2.5 left-2.5 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
            {discountPercent.endsWith('%') ? discountPercent : `${discountPercent}%`}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-sm text-muted-foreground mb-2 truncate" title={deal.title}>
          {deal.title}
        </h3>
        
        {/* Product Price */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">{deal.price}</span>
          {deal.originalPrice && (
            <span className="text-sm text-[hsl(var(--original-price-text))] line-through">
              {deal.originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Product Actions */}
      <div className="flex justify-between items-center p-4 border-t border-[hsl(var(--store-item-border))]">
        {/* Action Buttons (Left) */}
        <div className="flex gap-2.5">
          <button className="bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors hover:bg-[hsl(var(--action-btn-hover-bg))] text-muted-foreground hover:text-foreground">
            👍 +37
          </button>
          <button className="bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors hover:bg-[hsl(var(--action-btn-hover-bg))] text-muted-foreground hover:text-foreground">
            👎
          </button>
        </div>

        {/* Action Buttons (Right) */}
        <div className="flex gap-2.5">
          <button className="bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors hover:bg-[hsl(var(--action-btn-hover-bg))] text-muted-foreground hover:text-foreground">
            🔖
          </button>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors hover:bg-[hsl(var(--action-btn-hover-bg))] text-muted-foreground hover:text-foreground"
            aria-label="View deal source"
          >
            ↗
          </a>
          <button className="bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors hover:bg-[hsl(var(--action-btn-hover-bg))] text-muted-foreground hover:text-foreground">
            ⋯
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
