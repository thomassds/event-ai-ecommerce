import { headers } from "next/headers";

export default async function robots() {
  const headersList = headers();
  const host =
    (await headersList).get("x-forwarded-host") ??
    (await headersList).get("host");
  const protocol =
    (await headersList).get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/checkout", "/api", "/meus-dados"],
      },
    ],
    sitemap: `${protocol}://${host}/sitemap.xml`,
  };
}
