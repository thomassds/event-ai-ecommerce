import {
  ShieldIcon,
  CreditCardIcon,
  UserCircleIcon,
  InfoIcon,
  ShoppingCartSimpleIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { IconedButton } from "../buttons";

export const Header = ({ banners }: { banners: any[] }) => {
  return (
    <header className="w-full bg-[#5400D6] shadow flex flex-col items-center">
      <div className="w-full max-w-7xl p-2 gap-4">
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

        <div className="w-full flex justify-between items-center">
          <Image
            src="/white-logo.png"
            alt="logo"
            width={250}
            height={70}
            priority
            style={{ width: "auto", height: "auto" }}
          />

          <div className="flex justify-between h-16 items-center gap-4">
            <IconedButton
              icon={<UserCircleIcon size={30} />}
              upperText="Faça login"
              lowerText="ou Cadastre-se"
              tooltipText="Login ou Cadastro"
            />

            <IconedButton
              icon={<InfoIcon size={30} />}
              upperText="Suporte"
              lowerText="ou Contato"
              tooltipText="WhatsApp: (11) 4003-3063"
            />

            <IconedButton
              icon={<ShoppingCartSimpleIcon size={30} />}
              upperText=""
              lowerText=""
              tooltipText="Meu Carrinho"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
