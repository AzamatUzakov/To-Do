//Post запрос
export async function createColumnRequest(title: string) {
  const postRequest = await fetch("http://localhost:3001/columns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      title: title,
    }),
  });
  if (!postRequest.ok) {
    throw new Error("Failed to create column");
  }
  return await postRequest.json();
}

export const getColumnsRequest = async () => {
  const getRequest = await fetch("http://localhost:3001/columns");
  if (!getRequest.ok) {
    throw new Error("Ошибка при get запросе");
  }
  return await getRequest.json();
};

export const deleteColumnRequest = async (id: string) => {
  const deleteRequest = await fetch(`http://localhost:3001/columns/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!deleteRequest.ok) {
    throw new Error("Ошибка при delete запросе");
  }
};
