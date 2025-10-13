"use client";
import { useAppCheckout } from "@/hooks";
import { PaymentMethodType } from "@/interfaces/payment-method";
import { paymentMethodsMock } from "@/mocks/payment-methods-mock";
import {
  AlertCircleIcon,
  CreditCardIcon,
  Loader2Icon,
  QrCode,
} from "lucide-react";
import { useState } from "react";

interface PaymentMethodConfig {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}

const paymentMethodConfig: Record<string, PaymentMethodConfig> = {
  pix: {
    icon: QrCode,
    title: "PIX",
    description: "Pagamento instantâneo",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    textColor: "text-green-700",
    iconColor: "text-green-600",
  },
  credit_card: {
    icon: CreditCardIcon,
    title: "Cartão de Crédito",
    description: "Visa e Mastercard aceitos",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
  },
};

export const PaymentMethodsCard = () => {
  const { isProcessingPayment } = useAppCheckout();

  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [paymentMethodsError, setPaymentMethodsError] = useState<string | null>(
    null
  );
  const [supportedMethods, setSupportedMethods] = useState<string[]>([
    "pix",
    "credit_card",
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType | null>(null);

  const [cardData, setCardData] = useState<{
    cardNumber: string;
    cardHolderName: string;
    cardExpiry: string;
    cardCvc: string;
  } | null>(null);

  if (isLoadingPaymentMethods) {
    return (
      <div className="bg-white rounded-lg shadow-sm border lg:border-none lg:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:text-[#5400D6]">
          Métodos de Pagamento
        </h3>
        <div className="flex items-center justify-center py-8">
          <Loader2Icon className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600">
            Carregando métodos de pagamento...
          </span>
        </div>
      </div>
    );
  }

  if (paymentMethodsError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border lg:border-none lg:shadow-nonep-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:text-[#5400D6]">
          Métodos de Pagamento
        </h3>
        <div className="flex items-center justify-center py-8 text-red-600">
          <AlertCircleIcon className="w-6 h-6 mr-2" />
          <span>{paymentMethodsError}</span>
        </div>
      </div>
    );
  }

  if (supportedMethods.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border lg:border-none lg:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:text-[#5400D6]">
          Métodos de Pagamento
        </h3>
        <div className="flex items-center justify-center py-8 text-gray-600">
          <AlertCircleIcon className="w-6 h-6 mr-2" />
          <span>Nenhum método de pagamento disponível</span>
        </div>
      </div>
    );
  }

  const onPaymentMethodSelect = (method: PaymentMethodType) => {
    setSelectedPaymentMethod(method);
  };

  const getFriendlyMethodName = (method: PaymentMethodType) => {
    const config = paymentMethodConfig[method];

    return config ? config.title : method;
  };

  const isCardPayment = (method: PaymentMethodType | null) => {
    return (
      method === "credit_card" ||
      method === "credit_cash" ||
      method === "credit_installment"
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border lg:border-none lg:shadow-none p-6 lg:p-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:text-[#5400D6]">
          Métodos de Pagamento
        </h3>

        <div className="space-y-3">
          {paymentMethodsMock.map((method) => {
            const methodType = method.type;
            const config = paymentMethodConfig[methodType];
            const isSelected = selectedPaymentMethod === methodType;

            if (!config) return null;

            const IconComponent = config.icon;

            return (
              <button
                key={method.id}
                onClick={() => onPaymentMethodSelect(methodType)}
                className={`w-full flex items-center p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? `${config.borderColor} ${config.bgColor}`
                    : "border-gray-200 hover:border-gray-300"
                }`}
                disabled={isProcessingPayment}
              >
                <div
                  className={`flex-shrink-0 ${
                    isSelected ? config.iconColor : "text-gray-400"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="ml-4 flex-1 text-left">
                  <h4
                    className={`font-medium ${
                      isSelected ? config.textColor : "text-gray-900"
                    }`}
                  >
                    {config.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isSelected ? config.textColor : "text-gray-500"
                    }`}
                  >
                    {config.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      isSelected
                        ? `${config.borderColor} bg-current`
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected payment method details */}
        {selectedPaymentMethod && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              <span>Método selecionado: </span>
              <span className="ml-1 font-medium text-gray-900">
                {getFriendlyMethodName(selectedPaymentMethod)}
              </span>
            </div>

            {/* Card data summary */}
            {cardData && isCardPayment(selectedPaymentMethod) && (
              <div className="mt-2 pt-2 border-t text-sm text-gray-600">
                <div>Cartão configurado</div>
                <div className="text-xs">
                  {/* {cardData.installments > 1 */}
                  {/* ? installmentDetails?.installment_amount */}
                  {/* ? `${cardData.installments}x de R$ ${( */}
                  {/* installmentDetails.installment_amount / 100 */}
                  {/* ).toFixed(2)}` */}
                  {/* : `${cardData.installments}x (calculando...)` */}
                  {/* : "À vista"} */}A vista
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons or info */}
        {selectedPaymentMethod === "pix" && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              Pagamento instantâneo via PIX. Você receberá o QR Code na próxima
              etapa.
            </p>
          </div>
        )}

        {isCardPayment(selectedPaymentMethod) && !cardData && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Clique no botão acima para informar os dados do cartão.
            </p>
          </div>
        )}

        {isCardPayment(selectedPaymentMethod) && cardData && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              Dados do cartão salvos com segurança. Você pode finalizar a
              compra.
            </p>
            {/* {installmentDetails && ( */}
            <div className="mt-2 text-sm text-green-600">
              <strong>Método selecionado:</strong>{" "}
              {/* {getFriendlyMethodName(selectedPaymentMethod)} -{" "} */}
              {/* {installmentDetails.installments}x de R${" "} */}
              {/* {(installmentDetails.installment_amount / 100) */}
              {/* .toFixed(2) */}
              {/* .replace(".", ",")} */}
              {/* {installmentDetails.is_interest_free */}
              {/* ? " (sem juros)" */}
              {/* : " (com juros)"} */}
            </div>
            {/* )} */}
          </div>
        )}
      </div>

      {/* Credit Card Modal */}
      {/* <CreditCardModal
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          // Não mudar o método aqui - já foi definido pelo handleCardDataReady
        }}
        onCardDataReady={handleCardDataReady}
        totalAmountInCents={totalAmountInCents}
        eventId={eventId}
        enable3DS={enable3DS}
        title="Dados do Cartão de Crédito"
        acquirerId={acquirerId}
      /> */}
    </>
  );
};
