
import React from "react";
// Removed Menu, User, Bell, Heart, ShoppingBag imports as they are no longer used.
// Kept Search to potentially use Lucide icon later if "🔍" is not sufficient.
import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[100] px-5 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="bg-gradient-to-br from-primary to-accent w-[60px] h-[40px] rounded-lg flex items-center justify-center font-bold text-white text-lg">
        ST
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-5 relative">
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Search for internet's best clearance deals on SlashTag"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full py-3 pl-5 pr-12 border-2 border-secondary rounded-[25px] text-sm outline-none focus:border-primary transition-colors"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-primary w-9 h-9 rounded-full flex items-center justify-center text-white">
          {/* Using text "🔍" for now. Could be replaced with <Search size={20} /> or an SVG */}
          🔍
        </div>
      </div>

      {/* Country Flag */}
      <div className="bg-countryFlag text-white px-3 py-2 rounded-md text-xs flex items-center gap-1.5">
        🇺🇸 ▼
      </div>
    </header>
  );
};

export default Header;
