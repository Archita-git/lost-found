import BASE_URL from "./api";

export async function createItem(item, token) {
  const res = await fetch(`${BASE_URL}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(item)
  });

  return await res.json();
}
