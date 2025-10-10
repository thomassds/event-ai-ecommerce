"use client";

import { useState, ReactNode, useCallback } from "react";
import {
  CaretDownIcon,
  MoneyWavyIcon,
  TicketIcon,
  CalendarBlankIcon,
  CreditCardIcon,
} from "@phosphor-icons/react/dist/ssr";

interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: string | ReactNode;
  rightContent?: string | ReactNode;
  icon?: ReactNode;
}

interface GenericAccordionProps {
  title?: string;
  items: AccordionItem[];
  variant?: "default" | "compact" | "large";
  allowMultipleOpen?: boolean;
  noPadding?: boolean;
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
}

export const GenericAccordion = ({
  title,
  items,
  variant = "default",
  allowMultipleOpen = false,
  noPadding = false,
  className = "",
  titleClassName = "",
  itemClassName = "",
  contentClassName = "",
}: GenericAccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleToggleItem = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);

    if (expandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      if (!allowMultipleOpen) {
        newExpandedItems.clear();
      }
      newExpandedItems.add(itemId);
    }

    setExpandedItems(newExpandedItems);
  };

  const getIconByTitle = useCallback((title: string) => {
    const icons: Record<string, ReactNode> = {
      Pagamentos: <CreditCardIcon className="w-4 h-4 text-[#5400D6]" />,
      Eventos: <CalendarBlankIcon className="w-4 h-4 text-[#5400D6]" />,
      Ingressos: <TicketIcon className="w-4 h-4 text-[#5400D6]" />,
      Reembolso: <MoneyWavyIcon className="w-4 h-4 text-[#5400D6]" />,
    };

    return icons[title] || null;
  }, []);

  const isExpanded = (itemId: string) => expandedItems.has(itemId);

  const getVariantStyles = () => {
    const baseContainerClass = noPadding ? "mt-6" : "mx-4 md:mx-0 mt-6";
    const baseMtClass = noPadding ? "mt-8" : "md:px-6 lg:px-0 mt-8";

    switch (variant) {
      case "compact":
        return {
          container: baseContainerClass,
          button: "py-4 px-4",
          content: "px-4 pb-4",
          title: "text-sm font-medium",
          subtitle: "text-xs text-gray-500",
        };
      case "large":
        return {
          container: baseMtClass,
          button: "py-8 px-6",
          content: "px-6 pb-8",
          title: "font-bold text-sm",
          subtitle: "text-sm text-gray-600",
        };
      default:
        return {
          container: baseMtClass,
          button: "py-6 px-5",
          content: "px-5 pb-6",
          title: "font-medium text-sm",
          subtitle: "text-sm text-gray-600",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {variant === "large" ? (
        <div className="max-w-7xl mx-auto">
          {/* Título da seção */}
          {title && (
            <div className="mb-4">
              <h3
                className={`text-lg font-semibold text-gray-900 ${titleClassName}`}
              >
                {" "}
                {title}
              </h3>
            </div>
          )}

          {/* Accordion */}
          <div
            className={`border border-gray-200 rounded-lg bg-white ${itemClassName}`}
          >
            {items.map((item, index) => {
              const itemIsExpanded = isExpanded(item.id);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`
                      w-full ${
                        styles.button
                      } text-left transition-all duration-200
                      ${itemIsExpanded ? "bg-purple-50" : "hover:bg-gray-50"}
                    `}
                    aria-expanded={itemIsExpanded}
                    aria-controls={`accordion-content-${item.id}`}
                  >
                    <div className="hidden sm:flex items-center justify-between w-full">
                      <div className="flex-1 min-w-0">
                        <div
                          className={`flex gap-2 items-center font-semibold text-sm ${
                            styles.title
                          } ${
                            itemIsExpanded ? "text-[#5400D6]" : "text-gray-900"
                          }`}
                        >
                          {getIconByTitle(item.title)}
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className={`${styles.subtitle} mt-1`}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>

                      {item.rightContent && (
                        <div className="flex items-center mr-4">
                          <span
                            className={`text-sm font-medium ${
                              itemIsExpanded
                                ? "text-[#5400D6]"
                                : "text-gray-700"
                            }`}
                          >
                            {item.rightContent}
                          </span>
                        </div>
                      )}

                      <CaretDownIcon
                        size={16}
                        weight="regular"
                        color={itemIsExpanded ? "#5400D6" : "#6B7280"}
                        className={`transition-transform duration-200 flex-shrink-0 ${
                          itemIsExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <div className="sm:hidden w-full">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 min-w-0 pr-4">
                          <div
                            className={`${styles.title} ${
                              itemIsExpanded
                                ? "text-[#5400D6]"
                                : "text-gray-900"
                            } leading-tight`}
                          >
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className={`${styles.subtitle} mt-1`}>
                              {item.subtitle}
                            </div>
                          )}

                          {item.rightContent && (
                            <div className="mt-2">
                              <span
                                className={`text-sm font-medium ${
                                  itemIsExpanded
                                    ? "text-[#5400D6]"
                                    : "text-gray-700"
                                }`}
                              >
                                {item.rightContent}
                              </span>
                            </div>
                          )}
                        </div>

                        <CaretDownIcon
                          size={16}
                          weight="regular"
                          color={itemIsExpanded ? "#5400D6" : "#6B7280"}
                          className={`transition-transform duration-200 flex-shrink-0 mt-1 ${
                            itemIsExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Conteúdo expandido */}
                  {itemIsExpanded && (
                    <div
                      id={`accordion-content-${item.id}`}
                      className={`${styles.content} bg-white ${contentClassName}`}
                    >
                      <div className="pt-2 text-sm text-gray-700 leading-relaxed">
                        {typeof item.content === "string" ? (
                          <div className="whitespace-pre-line">
                            {item.content
                              // Quebra apenas bullets "•" quando usados como marcador no início de linha
                              .replace(/(^|\n)\s*•\s*/g, "$1• ")
                              // Quebra de linha após ponto e vírgula, sem interferir em palavras com hífen
                              .replace(/;\s*/g, ";\n")}
                          </div>
                        ) : (
                          item.content
                        )}
                      </div>
                    </div>
                  )}

                  {/* Separador entre itens */}
                  {index < items.length - 1 && (
                    <div className="border-b border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Título da seção */}
          {title && (
            <div className="mb-4">
              <h3
                className={`text-lg font-semibold text-gray-900 font-[Montserrat] ${titleClassName}`}
              >
                {title}
              </h3>
            </div>
          )}

          {/* Accordion */}
          <div
            className={`border border-gray-200 rounded-lg bg-white ${itemClassName}`}
          >
            {items.map((item, index) => {
              const itemIsExpanded = isExpanded(item.id);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`
                      w-full ${
                        styles.button
                      } text-left transition-all duration-200
                      ${itemIsExpanded ? "bg-purple-50" : "hover:bg-gray-50"}
                    `}
                    aria-expanded={itemIsExpanded}
                    aria-controls={`accordion-content-${item.id}`}
                  >
                    {/* Layout Desktop */}
                    <div className="hidden sm:flex items-center justify-between w-full">
                      <div className="flex-1 min-w-0">
                        <div
                          className={`${styles.title} ${
                            itemIsExpanded ? "text-[#5400D6]" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className={`${styles.subtitle} mt-1`}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>

                      {/* Conteúdo à direita (preço, etc.) */}
                      {item.rightContent && (
                        <div className="flex items-center mr-4">
                          <span
                            className={`text-sm font-medium ${
                              itemIsExpanded
                                ? "text-[#5400D6]"
                                : "text-gray-700"
                            }`}
                          >
                            {item.rightContent}
                          </span>
                        </div>
                      )}

                      <CaretDownIcon
                        size={16}
                        weight="regular"
                        color={itemIsExpanded ? "#5400D6" : "#6B7280"}
                        className={`transition-transform duration-200 flex-shrink-0 ${
                          itemIsExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    <div className="sm:hidden w-full">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 min-w-0 pr-4">
                          <div
                            className={`${styles.title} ${
                              itemIsExpanded
                                ? "text-[#5400D6]"
                                : "text-gray-900"
                            } leading-tight`}
                          >
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className={`${styles.subtitle} mt-1`}>
                              {item.subtitle}
                            </div>
                          )}
                          {/* Preço embaixo do título no mobile */}
                          {item.rightContent && (
                            <div className="mt-2">
                              <span
                                className={`text-sm font-medium ${
                                  itemIsExpanded
                                    ? "text-[#5400D6]"
                                    : "text-gray-700"
                                }`}
                              >
                                {item.rightContent}
                              </span>
                            </div>
                          )}
                        </div>

                        <CaretDownIcon
                          size={16}
                          weight="regular"
                          color={itemIsExpanded ? "#5400D6" : "#6B7280"}
                          className={`transition-transform duration-200 flex-shrink-0 mt-1 ${
                            itemIsExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {itemIsExpanded && (
                    <div
                      id={`accordion-content-${item.id}`}
                      className={`${styles.content} bg-white ${contentClassName}`}
                    >
                      <div className="pt-2 text-sm text-gray-700 leading-relaxed">
                        {typeof item.content === "string" ? (
                          <div className="whitespace-pre-line">
                            {item.content}
                          </div>
                        ) : (
                          item.content
                        )}
                      </div>
                    </div>
                  )}

                  {index < items.length - 1 && (
                    <div className="border-b border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
