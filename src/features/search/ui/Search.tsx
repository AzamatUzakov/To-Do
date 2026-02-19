import React, { useState } from "react";
import { AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTaskStore } from "@/features/task/model/TaskStore";

const statusConfig: Record<string, { label: string; style: string }> = {
  todo: {
    label: "К выполнению",
    style: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  },
  "in-progress": {
    label: "В процессе",
    style: "bg-blue-100 text-blue-600 dark:bg-primary/20 dark:text-primary",
  },
  done: {
    label: "Готово",
    style:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
};

const renderOption = (task: any) => ({
  value: task.title,
  label: (
    <div className="flex flex-col gap-2 py-1 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <h3 className="text-[13px] font-semibold leading-snug text-slate-800 tracking-tight truncate">
        {task.title}
      </h3>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
            statusConfig[task.status]?.style ?? statusConfig.todo.style
          }`}
        >
          {statusConfig[task.status]?.label ?? "К выполнению"}
        </span>
      </div>
    </div>
  ),
});
const Search: React.FC = () => {
  const [options, setOptions] = useState<any[]>([]);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  const openViewTask = useTaskStore((state) => state.openViewTask);

  const handleSearch = (text: string) => {
    setInputValue(text);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(text.toLowerCase()),
    );
    setOptions(filtered.map(renderOption));
  };

  const handleSelect = (_: string, option: any) => {
    const task = tasks.find((t) => t.title === option.value);
    if (task) openViewTask(task.id);
    setInputValue("");
    setOptions([]);
  };

  return (
    <div
      className={`
        flex items-center gap-2 px-4 h-11 w-full rounded-2xl border transition-all duration-200
        bg-white dark:bg-[#1e1e2e]
        ${
          focused
            ? "border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
            : "border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-500"
        }
      `}
    >
      <SearchOutlined
        className={`text-base shrink-0 transition-colors duration-200 ${
          focused ? "text-indigo-500" : "text-slate-400"
        }`}
      />

      <AutoComplete
        variant="borderless"
        options={options}
        value={inputValue}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onFocus={() => {
          setFocused(true);
          setOptions(tasks.map(renderOption));
        }}
        onBlur={() => setFocused(false)}
        placeholder="Поиск задач..."
        notFoundContent={
          <div className="flex flex-col items-center py-4 text-slate-400 dark:text-slate-500">
            <span className="text-2xl mb-1">🔍</span>
            <span className="text-sm">Задачи не найдены</span>
          </div>
        }
        styles={{
          popup: {
            root: {
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid #e2e8f0",
              padding: "4px",
            },
          },
        }}
        style={{ flex: 1, padding: 0 }}
        className="
          [&_.ant-select-selector]:!p-0
          [&_.ant-select-selector]:!bg-transparent
          [&_.ant-select-selection-search-input]:!text-slate-700
          [&_.ant-select-selection-search-input]:dark:!text-slate-200
          [&_.ant-select-selection-placeholder]:!text-slate-400
          [&_.ant-select-selection-placeholder]:dark:!text-slate-500
          [&_.ant-select-selection-placeholder]:!text-sm
          [&_.ant-select-item]:!rounded-xl
          [&_.ant-select-item]:!px-3
          [&_.ant-select-item-option-active]:!bg-slate-50
          [&_.ant-select-item-option-active]:dark:!bg-slate-800/60
        "
      />
    </div>
  );
};

export default Search;
