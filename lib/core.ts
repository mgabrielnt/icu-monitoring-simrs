// D:\projek-medis\icu-monitoring-simrs\lib\core.ts

// =====================
// API CLIENT GENERIK
// =====================
export async function apiClient<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const json = (await res.json().catch(() => null)) as unknown;

  if (!res.ok) {
    let message = "Terjadi kesalahan saat memproses permintaan.";

    if (json && typeof json === "object" && "message" in json) {
      const m = (json as { message?: unknown }).message;
      if (m) message = String(m);
    }

    throw new Error(message);
  }

  return json as T;
}

// =====================
// FORMAT TANGGAL
// =====================
export function formatDate(
  value?: string | Date | null,
  locale = "id-ID"
): string {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(locale);
}

export function formatDateTime(
  value?: string | Date | null,
  locale = "id-ID"
): string {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
