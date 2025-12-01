import BASE_URL from "./api";

export async function loginUser(email, password) {
  const data = new URLSearchParams();
  data.append("username", email);
  data.append("password", password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
  });

  return await res.json();
}
