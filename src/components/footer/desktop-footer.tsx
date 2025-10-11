"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  CreditCardIcon,
  PixLogoIcon,
  LockIcon,
  ShieldCheckIcon,
  FingerprintSimpleIcon,
  EnvelopeIcon,
  MapPinLineIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import BrandsCarousel from "./brands-carousel";
import { footerMock } from "../../mocks/footer-mock";

export const DesktopFooter = () => {
  const data = footerMock;
  const [itemsToShow, setItemsToShow] = useState<number>(6);
  const [showArrows, setShowArrows] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsToShow(6);
        setShowArrows(true);
      } else if (width >= 1024) {
        setItemsToShow(5);
        setShowArrows(true);
      } else if (width >= 768) {
        setItemsToShow(4);
        setShowArrows(false);
      } else if (width >= 640) {
        setItemsToShow(3);
        setShowArrows(false);
      } else {
        setItemsToShow(2);
        setShowArrows(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className={`w-full relative bg-white text-gray-800 py-8`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {
        <section
          className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 not-lg:max-w-full lg:max-w-[95%] w-full mx-auto bg-white rounded-lg z-10 h-24 lg:h-[100px] lg:py-8 not-lg:py-4 px-4 lg:px-[60px]"
          aria-labelledby="partner-brands-heading"
        >
          <h2 id="partner-brands-heading" className="sr-only">
            Nossos Parceiros
          </h2>
          <BrandsCarousel
            itemsToShow={itemsToShow}
            showArrows={showArrows}
            itemClassName="flex items-center justify-center h-full"
            arrowIconSize="w-6 h-6"
          >
            {data.brandCarousel.map((logoItem) => (
              <Link
                key={logoItem.id}
                href={logoItem.link.url || "#"}
                title={logoItem.link.title}
                aria-label={logoItem.link.alt || `Visite ${logoItem.image.alt}`}
                className="h-full flex items-center justify-center group relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
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
        </section>
      }
      <section
        className="bg-[#5400D6] pt-[96px] pb-[44px] px-[60px] "
        aria-labelledby="footer-navigation"
      >
        <div className="relative max-w-[1560px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 mb-10">
            {/* Company Logo */}
            <div className="">
              <div className="mb-3">
                <Image
                  src="/white-logo.png"
                  alt="BeachTicket Logo"
                  width={240}
                  height={77}
                  style={{ height: "auto" }}
                  className="w-auto h-auto max-w-[240px] brightness-0 invert"
                />
              </div>
            </div>

            <nav aria-labelledby="institutional-heading">
              <h3
                id="institutional-heading"
                className="font-semibold text-xl leading-7 tracking-normal text-white mb-4"
              >
                Políticas
              </h3>
              <ul className="space-y-3" role="list">
                {data.institutional.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.link}
                      className="font-normal text-base leading-normal tracking-normal text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="contact-heading">
              <h3
                id="contact-heading"
                className=" font-semibold text-xl leading-7 tracking-normal text-white mb-4"
              >
                Contato
              </h3>
              <address className="space-y-3 font-normal text-base leading-normal tracking-normal text-white not-italic">
                <div className="flex items-center gap-2">
                  <WhatsappLogoIcon
                    size={16}
                    color="white"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${data.contact.phone.replace(/\D/g, "")}`}
                    className="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-sm"
                  >
                    {data.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon size={16} color="white" aria-hidden="true" />
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-sm"
                  >
                    {data.contact.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinLineIcon
                    size={16}
                    color="white"
                    className="mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-white">{data.contact.address}</span>
                </div>
              </address>
            </section>

            <nav
              aria-labelledby="social-heading"
              className="lg:justify-self-end"
            >
              <h3
                id="social-heading"
                className="font-['Montserrat'] font-semibold text-xl leading-7 tracking-normal text-white mb-4"
              >
                Redes Sociais
              </h3>
              <ul className="flex space-x-4 mt-2" role="list">
                {data.social.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visite nosso perfil no ${item.name} (abre em nova aba)`}
                      className="w-11 h-11 flex items-center justify-center hover:opacity-80 ease-in transition-opacity p-2 focus:outline-none focus:ring-2 bg-white focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5400D6] rounded-full"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        style={{ height: "auto" }}
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section
        className="bg-white py-8 px-[60px] md:px-[120px] lg:px-[180px]"
        aria-labelledby="payment-security-heading"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <h2 id="payment-security-heading" className="sr-only">
            Informações de Pagamento e Segurança
          </h2>

          <div className="flex gap-10 border-red-500">
            <section
              className="w-full max-w-[600px] mx-auto"
              aria-labelledby="payment-methods-heading"
            >
              <h3
                id="payment-methods-heading"
                className="text-thin text-[#5400D6] text-base leading-6 text-center mb-3"
              >
                Formas de Pagamento
              </h3>
              <hr
                className="w-full max-w-4xl border-t border-[#E9EAEB]"
                role="separator"
                aria-hidden="true"
              />
              <div
                className="flex justify-center mt-3 gap-12"
                role="list"
                aria-label="Métodos de pagamento aceitos"
              >
                <div
                  className="flex flex-col items-center gap-2"
                  role="listitem"
                >
                  <CreditCardIcon
                    size={24}
                    color="#5400D6"
                    aria-hidden="true"
                  />
                  <span className=" font-normal text-xs leading-4 text-[#52575E] text-center">
                    Cartão de Crédito
                  </span>
                </div>
                <div
                  className="flex flex-col items-center gap-2"
                  role="listitem"
                >
                  <PixLogoIcon size={24} color="#5400D6" aria-hidden="true" />
                  <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                    Pix
                  </span>
                </div>
              </div>
            </section>

            <section
              className="w-full max-w-[600px] mx-auto"
              aria-labelledby="security-heading"
            >
              <h3
                id="security-heading"
                className="text-thin text-[#5400D6] text-base leading-6 text-center mb-3"
              >
                Segurança e Certificação
              </h3>
              <hr
                className="w-full max-w-4xl border-t border-[#E9EAEB]"
                role="separator"
                aria-hidden="true"
              />
              <div
                className="flex justify-center mt-3 gap-12"
                role="list"
                aria-label="Certificações de segurança"
              >
                <div
                  className="flex flex-col items-center gap-2"
                  role="listitem"
                >
                  <LockIcon size={24} color="#5400D6" aria-hidden="true" />
                  <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                    Segurança SSL
                  </span>
                </div>
                <div
                  className="flex flex-col items-center gap-2"
                  role="listitem"
                >
                  <ShieldCheckIcon
                    size={24}
                    color="#5400D6"
                    aria-hidden="true"
                  />
                  <span className=" font-normal text-xs leading-4 text-[#52575E] text-center">
                    Proteção de Dados
                  </span>
                </div>
                <div
                  className="flex flex-col items-center gap-2"
                  role="listitem"
                >
                  <FingerprintSimpleIcon
                    size={24}
                    color="#5400D6"
                    aria-hidden="true"
                  />
                  <span className="font-normal text-xs leading-4 text-[#52575E] text-center">
                    Autenticação Segura
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Divider */}
          <hr
            className="w-full max-w-4xl border-t border-[#E9EAEB]"
            role="separator"
            aria-hidden="true"
          />

          {/* Company Information */}
          <section
            className="w-full flex flex-col items-center gap-8"
            aria-labelledby="company-info-heading"
          >
            <h3 id="company-info-heading" className="sr-only">
              Informações da Empresa
            </h3>
            <address className="font-normal text-xs leading-4 text-[#52575E] text-center px-4 not-italic max-w-4xl">
              <span className="sr-only">Informações da empresa: </span>
              BeachTicket - CNPJ xx.xxx.xxx/xxxx-xx | Rua Teste, 030 | 101 |
              CITY - SP | CEP: xxxxxx-xxx | SAC: (19) 99999-9999 |
            </address>
            {/* <div aria-label="Logo da empresa">
              <Logo width={102} height={32} fill="#5400D6" aria-hidden="true" />
              <span className="sr-only">Logo da Empresa</span>
            </div> */}
          </section>
        </div>
      </section>
    </footer>
  );
};
