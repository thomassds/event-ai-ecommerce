"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { footerMock } from "@/mocks";
import {
  BarcodeIcon,
  CreditCardIcon,
  EnvelopeIcon,
  FingerprintSimpleIcon,
  LockIcon,
  MapPinLineIcon,
  MinusCircleIcon,
  PixLogoIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

export const MobileFooter = () => {
  const data = footerMock;
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    institutional: false,
    account: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle keyboard navigation for expandable sections
  const handleSectionKeyDown = (
    event: React.KeyboardEvent,
    section: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSection(section);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 640) {
        // setItemsToShow(3);
      } else {
        // setItemsToShow(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className={`w-full bg-white text-gray-800 py-8`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top Carousel Section - Brand carousel container */}
      {/* <section
        className="relative max-w-[1560px] w-full mx-auto bg-white rounded-lg z-10 h-24 py-8 px-4"
        style={{ marginTop: "-50px" }}
        aria-labelledby="partner-brands-heading"
      >
        <h2 id="partner-brands-heading" className="sr-only">
          Nossos Parceiros
        </h2>
        <BrandsCarousel
          itemsToShow={itemsToShow}
          showArrows={false}
          itemClassName="flex items-center justify-center h-full"
          arrowIconSize="w-6 h-6"
        >
          {data.brandCarousel.map((logoItem) => (
            <Link
              key={logoItem.id}
              href={logoItem.link.url || "#"}
              title={logoItem.link.title}
              aria-label={logoItem.link.alt || `Visite ${logoItem.image.alt}`}
              className="h-full flex items-center justify-center group relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
            >
              <Image
                src={logoItem.image.src}
                alt={logoItem.image.alt}
                title={logoItem.image.title}
                width={120}
                height={32}
                style={{ height: "auto" }}
                className="h-8 w-auto object-contain max-w-[120px] transition-opacity group-hover:opacity-80"
              />
            </Link>
          ))}
        </BrandsCarousel>
      </section> */}

      {/* Main Footer Navigation */}
      <nav
        className="bg-[#5400D6] pt-8 pb-8 px-4 w-full"
        aria-labelledby="footer-navigation-heading"
        role="navigation"
      >
        <div className="relative w-full max-w-sm mx-auto">
          <h2 id="footer-navigation-heading" className="sr-only">
            Navegação do Rodapé
          </h2>

          {/* Expandable Navigation Sections */}
          <div
            className="space-y-8 mb-8"
            role="group"
            aria-label="Seções de navegação expandíveis"
          >
            {/* Institutional Section */}
            <section className="bg-[#5400D6] rounded-lg overflow-hidden w-full">
              <h3 className="sr-only">Seção Políticas</h3>
              <button
                onClick={() => toggleSection("institutional")}
                onKeyDown={(e) => handleSectionKeyDown(e, "institutional")}
                className="w-full flex items-center justify-center bg-[#5400D6] text-white font-['Montserrat'] font-bold text-base leading-normal tracking-normal hover:bg-[#4a00c2] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] transition-colors group px-4 gap-1 h-11"
                aria-expanded={expandedSections.institutional}
                aria-controls="institutional-content"
                aria-label={`${
                  expandedSections.institutional ? "Fechar" : "Abrir"
                } seção institucional`}
                type="button"
              >
                <span className="align-middle">Políticas</span>
                <span
                  className="w-5 h-5 flex items-center justify-center"
                  aria-hidden="true"
                >
                  {expandedSections.institutional ? (
                    <MinusCircleIcon width={20} height={20} fill="white" />
                  ) : (
                    <PlusCircleIcon width={20} height={20} fill="white" />
                  )}
                </span>
              </button>

              {expandedSections.institutional && (
                <div
                  id="institutional-content"
                  className="bg-[#5400D6] px-4 pt-4 pb-3"
                  role="region"
                  aria-labelledby="institutional-content-heading"
                >
                  <h4 id="institutional-content-heading" className="sr-only">
                    Links Institucionais
                  </h4>
                  <nav aria-label="Links institucionais">
                    <ul className="space-y-2" role="list">
                      {data.institutional.map((item) => (
                        <li key={item.label} role="listitem">
                          <Link
                            href={item.link}
                            className="font-['Montserrat'] font-normal text-base leading-normal tracking-normal text-center align-middle bg-[#5400D6] text-white hover:text-white hover:bg-[#4a00c2] focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] block py-3 px-2 rounded transition-colors"
                            tabIndex={0}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </section>

            <section className="bg-[#5400D6] rounded-lg overflow-hidden w-full">
              <h3 className="sr-only">Seção Contato</h3>
              <button
                onClick={() => toggleSection("contact")}
                onKeyDown={(e) => handleSectionKeyDown(e, "contact")}
                className="w-full flex items-center justify-center bg-[#5400D6] text-white font-['Montserrat'] font-bold text-base leading-normal tracking-normal hover:bg-[#4a00c2] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] transition-colors group px-4 gap-1 h-11"
                aria-expanded={expandedSections.contact}
                aria-controls="contact-content"
                aria-label={`${
                  expandedSections.contact ? "Fechar" : "Abrir"
                } seção de contato`}
                type="button"
              >
                <span className="align-middle">Contato</span>
                <span
                  className="w-5 h-5 flex items-center justify-center"
                  aria-hidden="true"
                >
                  {expandedSections.contact ? (
                    <MinusCircleIcon width={20} height={20} fill="white" />
                  ) : (
                    <PlusCircleIcon width={20} height={20} fill="white" />
                  )}
                </span>
              </button>

              {expandedSections.contact && (
                <div
                  id="contact-content"
                  className="bg-[#5400D6] px-4 pt-4 pb-3"
                  role="region"
                  aria-labelledby="contact-content-heading"
                >
                  <h4 id="contact-content-heading" className="sr-only">
                    Informações de Contato
                  </h4>
                  <address className="space-y-2 font-['Montserrat'] font-normal text-base leading-normal tracking-normal text-center align-middle bg-[#5400D6] text-white not-italic">
                    <div className="text-center py-2">
                      <WhatsappLogoIcon
                        size={16}
                        color="white"
                        className="inline mr-2"
                        aria-hidden="true"
                      />
                      <a
                        href={`tel:${data.contact.phone.replace(/\D/g, "")}`}
                        className="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-sm"
                        aria-label={`Telefone: ${data.contact.phone}`}
                      >
                        {data.contact.phone}
                      </a>
                    </div>
                    <div className="text-center py-2">
                      <EnvelopeIcon
                        size={16}
                        color="white"
                        className="inline mr-2"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${data.contact.email}`}
                        className="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-sm break-all"
                        aria-label={`Email: ${data.contact.email}`}
                      >
                        {data.contact.email}
                      </a>
                    </div>
                    <div className="text-center py-2">
                      <MapPinLineIcon
                        size={16}
                        color="white"
                        className="inline mr-2"
                        aria-hidden="true"
                      />
                      <span
                        className="text-sm text-white"
                        aria-label={`Endereço: ${data.contact.address}`}
                      >
                        {data.contact.address}
                      </span>
                    </div>
                  </address>
                </div>
              )}
            </section>
          </div>

          <section
            className="text-center"
            aria-labelledby="social-networks-heading"
          >
            <h3
              id="social-networks-heading"
              className="font-['Montserrat'] font-semibold text-lg leading-6 tracking-normal text-white mb-4"
            >
              Redes Sociais
            </h3>
            <nav aria-label="Links das redes sociais">
              <ul className="flex justify-center space-x-4" role="list">
                {data.social.map((item) => (
                  <li key={item.name} role="listitem">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visite nosso perfil no ${item.name} (abre em nova aba)`}
                      className="w-10 h-10 flex items-center justify-center text-white hover:opacity-80 transition-opacity p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-full"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 brightness-0 invert"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>
      </nav>

      <section
        className="bg-white w-full max-w-[392px] mx-auto h-[440px] pt-8 pr-4 pb-8 pl-4"
        aria-labelledby="payment-security-heading"
      >
        <div className="flex flex-col gap-8">
          <h2 id="payment-security-heading" className="sr-only">
            Informações de Pagamento e Segurança
          </h2>

          <section
            className="w-full max-w-[240px] mx-auto"
            aria-labelledby="payment-methods-heading"
          >
            <h3
              id="payment-methods-heading"
              className="font-['Montserrat'] text-[#5400D6] font-semibold text-base leading-6 text-center mb-4"
            >
              Formas de Pagamento
            </h3>
            <div
              className="flex justify-center gap-6"
              role="list"
              aria-label="Métodos de pagamento aceitos"
            >
              <div className="flex flex-col items-center gap-2" role="listitem">
                <CreditCardIcon size={24} color="#5400D6" aria-hidden="true" />
                <span className=" font-normal text-xs leading-4 text-[#52575E] text-center">
                  Cartão de Crédito
                </span>
              </div>
              <div className="flex flex-col items-center gap-2" role="listitem">
                <PixLogoIcon size={24} color="#5400D6" aria-hidden="true" />
                <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                  Pix
                </span>
              </div>
              <div className="flex flex-col items-center gap-2" role="listitem">
                <BarcodeIcon size={24} color="#5400D6" aria-hidden="true" />
                <span className=" font-normal text-xs leading-4 text-[#52575E] text-center">
                  Boleto Bancário
                </span>
              </div>
            </div>
          </section>

          <hr
            className="w-full border-t border-[#E9EAEB]"
            role="separator"
            aria-hidden="true"
          />

          <section
            className="w-full max-w-[235px] mx-auto"
            aria-labelledby="security-heading"
          >
            <h3
              id="security-heading"
              className="font-['Montserrat'] text-[#5400D6] font-semibold text-base leading-6 text-center mb-4"
            >
              Segurança e Certificação
            </h3>
            <div
              className="flex justify-center gap-6"
              role="list"
              aria-label="Certificações de segurança"
            >
              <div className="flex flex-col items-center gap-2" role="listitem">
                <LockIcon size={24} color="#5400D6" aria-hidden="true" />
                <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                  Segurança SSL
                </span>
              </div>
              <div className="flex flex-col items-center gap-2" role="listitem">
                <ShieldCheckIcon size={24} color="#5400D6" aria-hidden="true" />
                <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                  Proteção de Dados
                </span>
              </div>
              <div className="flex flex-col items-center gap-2" role="listitem">
                <FingerprintSimpleIcon
                  size={24}
                  color="#5400D6"
                  aria-hidden="true"
                />
                <span className="font-['Albert_Sans'] font-normal text-xs leading-4 text-[#52575E] text-center">
                  Autenticação Segura
                </span>
              </div>
            </div>
          </section>

          <hr
            className="w-full border-t border-[#E9EAEB]"
            role="separator"
            aria-hidden="true"
          />

          <section
            className="w-full flex flex-col items-center gap-8"
            aria-labelledby="company-info-heading"
          >
            <h3 id="company-info-heading" className="sr-only">
              Informações da Empresa
            </h3>
            <address className="font-['Montserrat'] font-normal text-xs leading-4 text-[#52575E] text-center px-4 not-italic">
              <span className="sr-only">Informações da empresa: </span>
              {footerMock.company}
            </address>
            {/* <div aria-label="Logo da empresa">
              <LogoIcon
                width={102}
                height={32}
                fill="#5400D6"
                aria-hidden="true"
              />
              <span className="sr-only">Logo da Empresa</span>
            </div> */}
          </section>
        </div>
      </section>
    </footer>
  );
};
