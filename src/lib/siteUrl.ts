/**
 * Base URL for canonical / Open Graph / structured data.
 *
 * On Vercel, `VERCEL_URL` is injected automatically for every deployment and
 * contains the host of that deployment (without the protocol). This keeps the
 * public preview metadata correct without hardcoding localhost or a fixed
 * domain. Locally we fall back to http://localhost:3000.
 */
function normalise(value: string): string {
  return value.replace(/\/+$/, "");
}

export const SITE_URL: string = normalise(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

export function siteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
