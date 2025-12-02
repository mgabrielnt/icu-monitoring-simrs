// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getJson<TResp>(
  path: string,
  init?: RequestInit
): Promise<TResp> {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL belum diset di .env.local"
    );
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    ...(init || {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request gagal (${res.status})`);
  }

  return (await res.json()) as TResp;
}

export async function postJson<TBody, TResp>(
  path: string,
  body: TBody,
  init?: RequestInit
): Promise<TResp> {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL belum diset di .env.local"
    );
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request gagal (${res.status})`);
  }

  return (await res.json()) as TResp;
}
