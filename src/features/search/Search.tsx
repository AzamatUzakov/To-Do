import { Input } from "@/shared/ui/input";
import React from "react";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div>
      <Input
        placeholder="Search tasks..."
        className="dark:bg-surface-dark dark:border-slate-800 dark:rounded-xl dark:py-2.5 dark:placeholder:text-slate-500 dark:focus-visible:ring-primary/50"
      />
    </div>
  );
};

export default Search;
