import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CategoryList, Header } from "@/components";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const tenantName = "myticket";
  const baseUrl = "https://www.myticket.com.br";
  const description = `${tenantName} - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!`;

  return {
    title: {
      default: tenantName,
      template: `%s | ${tenantName}`,
    },
    description,
    authors: [{ name: tenantName }],
    icons: {
      icon: "/favicon.ico",
    },

    openGraph: {
      title: tenantName,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: tenantName,
      url: baseUrl,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: `${tenantName} - Plataforma de Ingressos`,
        },
      ],
      countryName: "Brazil",
      emails: ["sac@ingressosweb.com.br"],
      phoneNumbers: ["(11) 4003-3063"],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        "pt-BR": baseUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantName = "My Ticket";

  // Combined Organization + LocalBusiness schema for better local SEO
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: tenantName,
    url: "https://www.myticket.com.br",
    logo: "/logo.svg",
    image: "/logo.svg",
    telephone: "(11) 4003-3063",
    description: `${tenantName} é sua plataforma completa para comprar ingressos online de eventos, shows, apresentações culturais e entretenimento.`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(11) 4003-3063",
      contactType: "Customer Service",
      email: "sac@ingressosweb.com.br",
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Nevada, 717",
      addressLocality: "Londrina",
      addressRegion: "PR",
      postalCode: "86060-320",
      addressCountry: "BR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1200",
    },
    priceRange: "$$",
    paymentAccepted: ["Credit Card", "Debit Card", "PIX"],
    currenciesAccepted: "BRL",
    openingHours: "Mo-Su 00:00-23:59",
    serviceArea: {
      "@type": "Country",
      name: "Brazil",
    },
    sameAs: [
      "https://www.facebook.com/myticket",
      "https://www.instagram.com/myticket",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://www.myticket.com.br/eventos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const categories = [
    { id: "1", name: "Beach Tennis", slug: "beach-tennis" },
    { id: "2", name: "Fute Volei", slug: "fute-volei" },
    { id: "3", name: "Volei de Areia", slug: "volei-de-areia" },
    { id: "4", name: "Futebol", slug: "futebol" },
    { id: "5", name: "Basquete", slug: "basquete" },
  ];

  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
      </head>

      <body
        className={`${montserrat.variable} antialiased font-sans min-h-screen flex flex-col`}
      >
        <Header banners={[]} />
        <CategoryList categories={categories} />

        <div className="w-full max-w-7xl flex flex-col mx-auto flex-1">
          <main className={`flex-1 transition-all pt-6`}>{children}</main>
        </div>
      </body>
    </html>
  );
}
