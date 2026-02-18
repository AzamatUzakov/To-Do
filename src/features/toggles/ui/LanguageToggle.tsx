import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select";
import { changeLanguage } from "@/shared/config/i18n/i18n";

interface LanguageToggle {}

const LanguageToggle: React.FC<LanguageToggle> = () => {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    changeLanguage(lang as "en" | "ru");
  };

  return (
    <Select defaultValue={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className="cursor-pointer h-[34px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent className="cursor-pointer w-[40px] bg-white dark:bg-surface-dark dark:border-slate-800">
        <SelectGroup>
          <SelectItem value="ru" className="flex items-center gap-2 cursor-pointer">
            RU
          </SelectItem>
          <SelectItem value="en" className="flex items-center gap-2 cursor-pointer">
            EN
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageToggle;