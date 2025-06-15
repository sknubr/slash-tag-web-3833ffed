
import React from "react";
import { Tag } from "lucide-react";

interface TagListProps {
  tags: { id: number; name: string; description: string }[];
  query: string;
}

const getHighlightHtml = (text: string, highlight: string) => {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(
    regex,
    '<mark class="bg-fuchsia-200 px-1 rounded text-fuchsia-950">' + "$1" + "</mark>"
  );
};

const TagList: React.FC<TagListProps> = ({ tags, query }) => {
  if (tags.length === 0)
    return (
      <div className="mt-12 text-xl text-muted-foreground text-center">
        <span className="inline-block p-3 rounded-lg bg-muted/30">
          No matching tags found.
        </span>
      </div>
    );
  return (
    <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl w-full">
      {tags.map((t) => (
        <div
          key={t.id}
          className="group hover:scale-105 active:scale-100 transition-transform select-none rounded-2xl border border-border bg-white/70 shadow-md hover:shadow-xl px-6 py-7 flex flex-col gap-2 relative"
        >
          <div className="flex items-center gap-2 mb-1">
            <Tag className="text-fuchsia-600 group-hover:animate-bounce" size={20} />
            <span
              className="text-base font-semibold text-slate-900"
              // dangerouslySetInnerHTML is safe here since highlight is sanitized
              dangerouslySetInnerHTML={{
                __html: getHighlightHtml(t.name, query.startsWith("/") ? query : ""),
              }}
            />
          </div>
          <span
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: getHighlightHtml(t.description, query),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TagList;
