import { Segmented } from "antd";
import React from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { switchViewStore } from "../model/ViewToggleStore";

interface ViewToggleProps {}

const ViewToggle: React.FC<ViewToggleProps> = () => {
  const viewMode = switchViewStore((state) => state.viewMode);
  const setViewMode = switchViewStore((state) => state.setViewMode);

  return (
    <Segmented
      orientation="horizontal"
      options={[
        { value: "Kanban", icon: <AppstoreOutlined /> },
        { value: "List", icon: <BarsOutlined /> },
      ]}
      value={viewMode}
      onChange={setViewMode}
    />
  );
};

export default ViewToggle;
