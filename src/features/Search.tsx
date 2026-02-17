import { Input } from "@/shared/ui/input";
import React from "react";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div>
      <Input placeholder="Serch" />
    </div>
  );
};

export default Search;
