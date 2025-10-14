import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CategoryList, Footer, Header } from "@/components";
import { ConditionalBanner } from "@/components/banners/conditional-banners";
import { ReduxProvider } from "@/providers";
import { banners } from "@/mocks";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const tenantName = "Beach Ticket";
  const baseUrl = "https://www.beachticket.com.br";
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
  const tenantName = "Beach Ticket";

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: tenantName,
    url: "https://www.beachticket.com.br",
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
      "https://www.facebook.com/beachticket",
      "https://www.instagram.com/beachticket",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://www.beachticket.com.br/eventos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

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
        <ReduxProvider>
          <Header />
          <CategoryList />

          <ConditionalBanner banners={banners} />

          <div className="w-full max-w-7xl flex flex-col mx-auto flex-1 pb-10 p-4">
            <main className={`flex-1 transition-all pt-6`}>{children}</main>
          </div>

          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
