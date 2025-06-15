
import React, { useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface CommandBarProps {
  value: string;
  onValueChange: (val: string) => void;
}

/**
 * A beautiful, keyboard-focusable command bar styled for desktop.
 */
const CommandBar: React.FC<CommandBarProps> = ({ value, onValueChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Slash hotkey: focus bar with "/"
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        !(e.ctrlKey || e.metaKey || e.altKey) // ignore ctrl/cmd+/
      ) {
        inputRef.current?.focus();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex items-center bg-white/80 border border-border shadow-lg rounded-2xl px-4 py-3 ring-1 ring-inset ring-blue-200/80 hover:ring-fuchsia-400 focus-within:ring-fuchsia-600 transition-all">
      <Search size={22} className="flex-shrink-0 text-indigo-500 mr-2" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex-1 text-lg md:text-xl bg-transparent outline-none placeholder:text-slate-400 font-medium"
        autoFocus
        spellCheck={false}
        autoCapitalize="off"
        aria-label="Type a slash tag"
        placeholder="Type a /slash tag or keyword… (press &quot;/&quot; to focus)"
      />
    </div>
  );
};

export default CommandBar;
