import React, { useEffect, useId, useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "@/shared/ui/input";
import { createColumnRequest } from "../api/BoardApi";
import { useBoardStore } from "../model/BoardStore";

interface CreateBoardProps {}
const CreateBoard: React.FC<CreateBoardProps> = () => {
  const [title, setTitle] = useState<string>("");

  const isModalOpen = useBoardStore((state) => state.isModalOpen);
  const closeModal = useBoardStore((state) => state.closeModal);
  const addColumn = useBoardStore((state) => state.addColumn);

  async function createColumn() {
    try {
      const newColumn = await createColumnRequest(title); //Функция POST для калонок

      addColumn(newColumn);
      setTitle("");
      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Modal
        title="Создание колонки"
        footer={null}
        onCancel={() => {
          closeModal();
          setTitle("");
        }}
        open={isModalOpen}
      >
        <div className="flex flex-col gap-4 w-full py-4 bg-white ">
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название колонки"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <button
            onClick={() => {
              createColumn();
            }}
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 active:scale-95 transition-transform"
          >
            <span>Сохранить</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateBoard;
