import { Segmented, Space } from "antd";
import React, { useEffect, useState } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

type Theme = "light" | "dark";

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    document.documentElement.classList.toggle("dark", value === "dark");
    setTheme(value);
  };

  return (
    <Space>
      <Segmented
        shape="round"
        options={[
          { value: "light", icon: <SunOutlined /> },
          { value: "dark", icon: <MoonOutlined /> },
        ]}
        value={theme}
        onChange={toggleTheme}
      />
    </Space>
  );
};

export default ThemeToggle;
