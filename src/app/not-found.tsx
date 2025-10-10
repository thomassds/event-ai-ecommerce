import Link from "next/link";
import { HouseIcon, WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-brand-50 p-6 rounded-full">
              <WarningCircleIcon
                size={80}
                className="text-brand-600"
                weight="fill"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-brand-600">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800">
              Página não encontrada
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <p className="text-lg">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-base">
            Mas não se preocupe, temos muitos eventos incríveis esperando por
            você!
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button size="lg" className="flex items-center gap-2">
              <HouseIcon size={20} />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Precisa de ajuda? Confira essas opções:
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/eventos"
              className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
            >
              Todos os Eventos
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/categorias"
              className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
            >
              Categorias
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/ajuda"
              className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
            >
              Central de Ajuda
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/conta"
              className="text-brand-600 hover:text-brand-700 transition-colors duration-200"
            >
              Minha Conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
