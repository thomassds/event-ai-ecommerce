"use client";

import {
  ShieldIcon,
  CreditCardIcon,
  UserCircleIcon,
  InfoIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { IconedButton } from "../buttons";
import { SearchInput } from "../inputs";
import { useRouter } from "next/navigation";

export const Header = ({ banners }: { banners: any[] }) => {
  const router = useRouter();

  return (
    <header className="w-full bg-[#5400D6] shadow flex flex-col items-center">
      <div className="w-full max-w-7xl p-2 flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <CreditCardIcon size={16} weight="regular" color="white" />
            <span className="font-thin text-white text-sm font-medium">
              Parcele Seu Ingresso <b className="font-bold">Em Até 12x</b>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldIcon size={16} weight="regular" color="white" />
            <span className="text-white text-sm font-medium font-thin">
              <b className="font-bold">Compra 100% Segura</b>
            </span>
          </div>
        </div>

        <div className="w-full flex justify-between items-center gap-4">
          <Image
            onClick={() => router.push("/")}
            src="/white-logo.png"
            alt="logo"
            width={250}
            height={70}
            priority
            style={{ cursor: "pointer", width: "auto", height: "auto" }}
          />

          <div className="flex-1">
            <SearchInput />
          </div>

          <div className="flex h-16 items-center gap-4 ">
            <IconedButton
              icon={<UserCircleIcon size={30} />}
              upperText="Meus Eventos "
              lowerText="ou Criar Evento"
              tooltipText="Area do Produtor"
              onClick={() => router.push("/auth")}
            />

            <IconedButton
              icon={<UserCircleIcon size={30} />}
              upperText="Faça login"
              lowerText="ou Cadastre-se"
              tooltipText="Login ou Cadastro"
              onClick={() => router.push("/auth")}
            />

            <IconedButton
              icon={<InfoIcon size={30} />}
              upperText="Suporte"
              lowerText="ou Contato"
              tooltipText="WhatsApp: (11) 4003-3063"
            />

            {/* <IconedButton
              icon={<ShoppingCartSimpleIcon size={30} />}
              upperText=""
              lowerText=""
              tooltipText="Meu Carrinho"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
