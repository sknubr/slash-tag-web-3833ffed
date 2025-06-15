
import React, { useRef } from "react";
import CommandBar from "@/components/CommandBar";
import TagList from "@/components/TagList";
import { useState } from "react";

/**
 * This is the main desktop app layout for Slash Tag Web.
 */
const DEMO_TAGS = [
  { id: 1, name: "/focus", description: "Deep work mode" },
  { id: 2, name: "/meetings", description: "All scheduled meetings" },
  { id: 3, name: "/tasks", description: "To-dos and tasks" },
  { id: 4, name: "/notes", description: "Quick notes" },
  { id: 5, name: "/inbox", description: "Unsorted items" },
  { id: 6, name: "/urgent", description: "Requires immediate attention" },
];

const Index = () => {
  const [query, setQuery] = useState("");
  const tagListRef = useRef<HTMLDivElement>(null);

  // Basic filter logic for demo
  const filteredTags = DEMO_TAGS.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-blue-50 to-fuchsia-100 flex flex-col items-center justify-start">
      {/* Desktop app "app bar" look */}
      <header className="w-full py-8 px-6 flex flex-col items-center">
        <h1 className="text-[2.8rem] font-extrabold tracking-tight bg-gradient-to-tr from-[#2e1065] via-indigo-800 to-fuchsia-700 bg-clip-text text-transparent drop-shadow-lg mb-1 select-none">
          Slash Tag Web
        </h1>
        <span className="text-muted-foreground text-lg mb-6">
          Super-fast command bar & tagging demo. Try typing <code className="bg-muted px-1 py-0.5 rounded">/task</code> or <code className="bg-muted px-1 py-0.5 rounded">urgent</code>.
        </span>
        <CommandBar value={query} onValueChange={setQuery} />
      </header>
      <main
        ref={tagListRef}
        className="w-full flex flex-col items-center px-4"
      >
        <TagList tags={filteredTags} query={query} />
      </main>
      <footer className="mt-auto pt-8 pb-4 text-center text-xs text-muted-foreground opacity-60">
        © {new Date().getFullYear()} Slash Tag Web &mdash; <span className="font-medium">Your productivity starts here.</span>
      </footer>
    </div>
  );
};

export default Index;
