"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { PlusIcon, MinusIcon } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/format-currency";
import {
  DateOption,
  EventDetails,
  LotTaxInfo,
  TicketOption,
} from "@/interfaces";
import { GenericAccordion } from "../accordions";
import Image from "next/image";
import { useAppCheckout } from "@/hooks";

const ITEMS_PER_PAGE_DEFAULT = 3;

const VariationTaxInfo = ({ lot }: { lot: LotTaxInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  let taxAdmin = lot.taxAdm;
  if (lot.typeTaxAdm === "P") {
    taxAdmin = lot.price * (lot.taxAdm / 100);
  }

  if (isLoading) {
    return (
      <div className="text-sm text-gray-600">
        <span className="font-medium">Taxa administrativa:</span>{" "}
        <span className="text-orange-600">Carregando...</span>
      </div>
    );
  }

  if (error || !lot.price) {
    return (
      <div className="text-sm text-gray-600">
        <span className="font-medium">Taxa administrativa:</span>{" "}
        <span className="text-red-600">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-gray-900">
        <span className="font-medium">Preço base:</span>{" "}
        {formatCurrency(lot.price)}
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Taxa administrativa:</span>{" "}
        {formatCurrency(taxAdmin)}
      </div>
      <div className="text-sm text-green-600 font-semibold">
        <span className="font-medium">Preço final:</span>{" "}
        {formatCurrency(lot.price + taxAdmin)}
      </div>

      <div className="text-xs text-blue-600 mt-1">
        Faça login para selecionar ingressos
      </div>
    </>
  );
};

interface TicketSelectorClientProps {
  tickets: TicketOption[];
  event: EventDetails;
  availableDates?: DateOption[];
  isUserAuthenticated?: boolean;
  clientId?: number;
}

export const TicketSelectorClient = ({
  tickets,
  event,
  availableDates,
  isUserAuthenticated = false,
  clientId,
}: TicketSelectorClientProps) => {
  const { addLotSelected, removeLotSelected, lotsSelected } = useAppCheckout();

  const [groupSearch, setGroupSearch] = useState<Record<string, string>>({});
  const [groupPage, setGroupPage] = useState<Record<string, number>>({});
  const [loadingTaxes, setLoadingTaxes] = useState<Record<string, boolean>>({});
  const pageSize = ITEMS_PER_PAGE_DEFAULT;

  const handleSearchChange = (groupId: string, value: string) => {
    setGroupSearch((prev) => ({ ...prev, [groupId]: value }));
    setGroupPage((prev) => ({ ...prev, [groupId]: 1 }));
  };

  const handleTaxLoadingChange = useCallback(
    (lotId: string, isLoading: boolean) => {
      setLoadingTaxes((prev) => ({ ...prev, [lotId]: isLoading }));
    },
    []
  );

  const taxLoadingCallbacks = useMemo(() => {
    const callbacks: Record<string, (isLoading: boolean) => void> = {};
    return {
      getCallback: (lotId: string) => {
        if (!callbacks[lotId]) {
          callbacks[lotId] = (isLoading: boolean) =>
            handleTaxLoadingChange(lotId, isLoading);
        }
        return callbacks[lotId];
      },
    };
  }, [handleTaxLoadingChange]);

  const getPageFor = (groupId: string) => groupPage[groupId] || 1;
  const setPageFor = (groupId: string, page: number) =>
    setGroupPage((prev) => ({ ...prev, [groupId]: page }));

  const generateTicketVariations = () => {
    const selectedDates: string[] = [];
    if (true || selectedDates.length === 0) {
      return tickets.map((ticket) => ({
        id: ticket.id,
        title: ticket.name,
        rightContent: ticket.price,
        content: (
          <div className="space-y-4">
            {/* Busca por grupo */}
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={groupSearch[ticket.id] || ""}
                onChange={(e) => handleSearchChange(ticket.id, e.target.value)}
                placeholder="Buscar por variação ou lote"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={`Buscar ingressos do grupo ${ticket.name}`}
              />
            </div>

            {(() => {
              const term = (groupSearch[ticket.id] || "").toLowerCase();
              const filtered = ticket.variations.filter((v) => {
                // Filtrar apenas por termo de busca - MANTER ingressos esgotados visíveis
                const matchesSearch = [v.name, String(v.lote || "")].some((f) =>
                  String(f).toLowerCase().includes(term)
                );

                return matchesSearch;
              });

              const total = filtered.length;
              const needsPagination = total > pageSize;
              const page = getPageFor(ticket.id);
              const start = (page - 1) * pageSize;
              const pageItems = needsPagination
                ? filtered.slice(start, start + pageSize)
                : filtered;

              return (
                <>
                  {pageItems.map((variation, varIndex) => {
                    const currentQuantity =
                      lotsSelected[variation.lotId]?.quantitySelected || 0;
                    const lotIdString = String(variation.lotId);

                    // Verificar se o ingresso está esgotado
                    const isOutOfStock =
                      !variation.available || variation.maxQuantity === 0;
                    const maxQuantityReached =
                      currentQuantity >= variation.maxQuantity;

                    return (
                      <div key={variation.id}>
                        <div
                          className={`flex items-start justify-between py-4 ${
                            varIndex > 0 ? "border-t border-gray-200" : ""
                          } ${isOutOfStock ? "opacity-75" : ""}`}
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Ingresso:</span>{" "}
                                {variation.name}
                              </div>
                              {isOutOfStock && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Esgotado
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Lote:</span>{" "}
                              {variation.lote}
                            </div>
                            <VariationTaxInfo lot={variation.lotTaxInfo!} />
                          </div>

                          {!isOutOfStock ? (
                            <div className="flex flex-col items-center gap-2 border border-gray-200 rounded-lg p-2">
                              <button
                                onClick={() =>
                                  addLotSelected(variation.lotTaxInfo!, 1)
                                }
                                disabled={
                                  !isUserAuthenticated || maxQuantityReached
                                }
                                className="w-8 h-8 rounded-md bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                aria-label={`Adicionar ingresso ${variation.name}`}
                                title={
                                  !isUserAuthenticated
                                    ? "Faça login para selecionar ingressos"
                                    : loadingTaxes[lotIdString]
                                    ? "Aguarde o carregamento da taxa administrativa"
                                    : maxQuantityReached
                                    ? "Quantidade máxima atingida"
                                    : ""
                                }
                              >
                                <PlusIcon
                                  size={16}
                                  color={
                                    !isUserAuthenticated || maxQuantityReached
                                      ? "#9CA3AF"
                                      : "#5400D6"
                                  }
                                />
                              </button>

                              <div className="w-8 h-8 flex items-center justify-center">
                                <span className="text-lg font-bold text-gray-900">
                                  {String(currentQuantity).padStart(2, "0")}
                                </span>
                              </div>

                              <button
                                onClick={() =>
                                  removeLotSelected(variation.lotId)
                                }
                                disabled={
                                  !isUserAuthenticated ||
                                  currentQuantity <= 0 ||
                                  loadingTaxes[lotIdString]
                                }
                                className="w-8 h-8 rounded-md bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                aria-label={`Remover ingresso ${variation.name}`}
                                title={
                                  !isUserAuthenticated
                                    ? "Faça login para selecionar ingressos"
                                    : loadingTaxes[lotIdString]
                                    ? "Aguarde o carregamento da taxa administrativa"
                                    : ""
                                }
                              >
                                <MinusIcon
                                  size={16}
                                  color={
                                    !isUserAuthenticated ||
                                    loadingTaxes[lotIdString]
                                      ? "#9CA3AF"
                                      : "#5400D6"
                                  }
                                />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-400">
                              <span className="text-sm">Indisponível</span>
                            </div>
                          )}
                        </div>

                        {/* Mensagem de alerta para ingressos esgotados - UI unificado */}
                        {isOutOfStock && (
                          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-5 h-5 text-yellow-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                {variation.name
                                  .toLowerCase()
                                  .includes("meia") ? (
                                  <>
                                    <div className="text-sm font-semibold text-yellow-800">
                                      Cota de meia-entrada esgotada
                                    </div>
                                    <div className="text-sm text-yellow-700">
                                      A cota de 40% destinada à meia-entrada foi
                                      esgotada para este setor.
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="text-sm font-semibold text-yellow-800">
                                      {variation.lote} - {variation.name}{" "}
                                      esgotado
                                    </div>
                                    <div className="text-sm text-yellow-700">
                                      Lote esgotado para este evento. Verifique
                                      outras opções disponíveis.
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {needsPagination && (
                    <div className="flex items-center justify-between pt-2">
                      <button
                        className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                        onClick={() =>
                          setPageFor(ticket.id, Math.max(1, page - 1))
                        }
                        disabled={page === 1}
                        aria-label="Página anterior"
                      >
                        Anterior
                      </button>
                      <span className="text-xs text-gray-600">
                        Página {page} de {Math.ceil(total / pageSize)}
                      </span>
                      <button
                        className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                        onClick={() =>
                          setPageFor(
                            ticket.id,
                            Math.min(Math.ceil(total / pageSize), page + 1)
                          )
                        }
                        disabled={page >= Math.ceil(total / pageSize)}
                        aria-label="Próxima página"
                      >
                        Próximo
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ),
      }));
    }
  };

  const accordionItems = generateTicketVariations();

  return (
    <div className="md:px-6 lg:px-0 mt-6">
      <div className="mb-4">
        <div className="text-[14px] md:text-[20px] font-normal text-gray-900 font-[Montserrat]">
          Selecionar
        </div>
        <div
          className="text-[20px] md:text-[32px] font-semibold font-[Montserrat]"
          style={{ color: "#5400D6" }}
        >
          Ingresso
        </div>
      </div>

      {event.imageMapEvent && (
        <div className={"mb-8"}>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="relative w-full bg-white">
              <Image
                src={event.imageMapEvent}
                alt={`Mapa do ${event.title}`}
                width={400}
                height={300}
                style={{ height: "auto" }}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <GenericAccordion
          items={accordionItems}
          variant="default"
          noPadding={true}
          className="mt-0"
        />
      </div>

      <div className="mt-8">
        {/* <CouponInput
          onCouponApplied={() => {}}
          onCouponRemoved={() => {}}
          cartId={cartId || undefined}
          sessionToken={sessionToken || undefined}
          clientId={clientId}
          autoValidate={true}
          autoValidateDelay={1000}
          className="mt-0"
          isUserAuthenticated={isUserAuthenticated}
          previewMode={true}
        /> */}
      </div>
    </div>
  );
};
