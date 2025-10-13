"use client";

import { formatCurrency } from "@/utils/format-currency";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useAppCheckout } from "@/hooks";

interface OrderSummaryCardProps {
  variant?: "desktop" | "mobile";
  processPayment?: boolean;
}

export const OrderSummaryCard = ({
  variant = "desktop",
  processPayment,
}: OrderSummaryCardProps) => {
  const router = useRouter();
  const {
    calculateResume,
    lotsSelected,
    isProcessingPayment,
    handleProcessPayment,
  } = useAppCheckout();

  const hasLocalItems = false;
  const isAuthenticated = true;
  const hasItems = Object.keys(lotsSelected).length > 0;

  const displayItems = Object.values(lotsSelected);

  const { finalTotal, adminTax, discount, subtotal } = calculateResume();

  const hasCoupon = false;

  const handleButtonClick = () => {
    if (processPayment) {
      return handleProcessPayment();
    }

    if (hasItems) {
      router.push("/checkout");
      return;
    }
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-600">Total</span>
          <span className="text-lg font-bold text-green-600">
            {formatCurrency(finalTotal)}
          </span>
          {hasCoupon && !hasItems && (
            <span className="text-xs text-blue-600">Cupom fewfew aplicado</span>
          )}
        </div>
        <button
          onClick={handleButtonClick}
          disabled={!hasItems && isAuthenticated}
          className={`font-semibold py-3 px-6 rounded-lg transition-colors ${
            hasLocalItems
              ? "bg-green-600 hover:bg-green-700 text-white"
              : hasItems
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : !isAuthenticated
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label={`${
            hasItems
              ? "Finalizar compra"
              : !isAuthenticated
              ? "Fazer login"
              : "Selecione ingressos"
          } - Total: ${formatCurrency(finalTotal)}`}
        >
          {hasItems
            ? "Finalizar Compra"
            : !isAuthenticated
            ? "Fazer Login"
            : "Selecione ingressos"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumo da Compra
        </h3>

        <div className="space-y-3">
          {hasCoupon && !hasItems && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  size={16}
                  className="text-blue-600 flex-shrink-0"
                />
                <p className="text-xs text-blue-700">
                  Cupom <strong>fwefew</strong> aplicado! Selecione ingressos
                  para ver o desconto.
                </p>
              </div>
            </div>
          )}

          {hasItems ? (
            <div className="space-y-4">
              <div className="space-y-3">
                {displayItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 leading-tight">
                          {item.name}
                        </h4>
                        {item.name && (
                          <p className="text-xs text-gray-600 mt-1">
                            {item.name}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {item.quantitySelected}{" "}
                          {item.quantitySelected === 1
                            ? "ingresso"
                            : "ingressos"}{" "}
                          × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantitySelected)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Separador */}
              <hr className="border-t border-gray-200" />

              {/* Cálculos */}
              {(() => {
                return (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Taxa administrativa:
                      </span>
                      <span className="text-gray-900">
                        {formatCurrency(adminTax)}
                      </span>
                    </div>

                    {hasLocalItems && discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Desconto:</span>
                        <span className="text-green-600">
                          -{formatCurrency(discount)}
                        </span>
                      </div>
                    )}

                    <hr className="border-t border-gray-200 my-3" />

                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">
                        Total a Pagar:
                      </span>
                      <span className="text-xl font-bold text-purple-600">
                        {formatCurrency(finalTotal)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-2">
                Nenhum ingresso selecionado
              </p>
              {!isAuthenticated && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700">
                    <strong>Faça login</strong> para adicionar ingressos ao
                    carrinho e aplicar cupons de desconto.
                  </p>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total a Pagar:</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleButtonClick}
            disabled={(!hasItems && isAuthenticated) || isProcessingPayment}
            className={`w-full font-semibold py-3 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              hasLocalItems
                ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                : hasItems
                ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                : !isAuthenticated
                ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            aria-label={
              isProcessingPayment
                ? "Processando pagamento"
                : hasItems
                ? "Finalizar compra"
                : !isAuthenticated
                ? "Fazer login"
                : "Selecione ingressos"
            }
          >
            {!isProcessingPayment ? (
              hasItems ? (
                "Finalizar Compra"
              ) : !isAuthenticated ? (
                "Fazer Login"
              ) : (
                "Selecione ingressos"
              )
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  role="presentation"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processando...
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
