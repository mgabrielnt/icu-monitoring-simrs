// D:\projek-medis\icu-monitoring-simrs\lib\api.ts

export async function postJson<TBody, TResponse = unknown>(
  url: string,
  body: TBody,
  init?: RequestInit
): Promise<TResponse> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const txt = await res.text();
      if (txt) message += `: ${txt}`;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  // Kalau backend kamu balikin 204 No Content
  if (res.status === 204) {
    return undefined as unknown as TResponse;
  }

  return (await res.json()) as TResponse;
}
