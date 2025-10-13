import {
  ContactInfoCard,
  ContactInfoItemCard,
  OrderSummaryCard,
  PaymentMethodsCard,
} from "@/components";
import {
  EnvelopeIcon,
  IdentificationCardIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";

import { type Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const title = `Beach Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos`;
    const description = `Beach Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        locale: "pt_BR",
        siteName: "Beach Ticket",
        url: "https://www.beachticket.com.br",
        images: [
          {
            url: "/logo.svg",
            width: 1200,
            height: 630,
            alt: `beachticket - Plataforma de Ingressos Online`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [""],
      },
      alternates: {
        canonical: "https://www.beachticket.com.br",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title:
        "Beach Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos",
      description:
        "Beach Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!",
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function Checkout() {
  const isLoading = false;

  return (
    <div className="flex-1 overflow-y-auto p-2 pt-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:container">
      {/* Left Column - Mobile: stack vertically, Desktop: left column */}
      <div className="space-y-6">
        <div className="hidden lg:block bg-white rounded-lg px-3">
          <span className="text-[32px] font-semibold text-[#5400D6]">
            Checkout
          </span>
        </div>
        <ContactInfoCard />

        {/* REMOVIDO: Seção de itens antiga - agora os itens são exibidos no BackendOrderSummary */}

        {/* Verificação de completude do endereço - apenas para pagamentos com cartão */}
        {/* {isAuthenticated &&
          !isAddressComplete &&
          !isCheckingAddress &&
          isCardPayment(selectedPaymentMethod) && (
            <AddressCompletionForm
              missingFields={missingFields || []}
              onComplete={handleAddressCompleted}
            />
          )} */}

        {/* Dynamic Payment Methods Section - sempre visível */}
        <div>
          {/* Sempre mostrar métodos de pagamento */}
          {/* <DynamicPaymentMethodsSection
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            availablePaymentMethods={availablePaymentMethods}
            isLoadingPaymentMethods={isLoadingPaymentMethods}
            paymentMethodsError={paymentMethodsError}
            totalAmountInCents={totalInCents}
            eventId={eventId}
            enable3DS={should3DS()}
            onCardDataReady={handleCardDataReady}
            isCardModalOpen={isCardModalOpen}
            setIsCardModalOpen={setIsCardModalOpen}
            acquirerId={eventData?.acquirerId}
          /> */}
        </div>
        <PaymentMethodsCard />

        <div className="lg:hidden">
          <OrderSummaryCard processPayment={true} />
        </div>
      </div>

      <div className="hidden lg:block space-y-6 lg:h-fit lg:rounded-lg">
        <OrderSummaryCard processPayment={true} />
      </div>
    </div>
  );
}
