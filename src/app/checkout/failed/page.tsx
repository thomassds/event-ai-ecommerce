import { Button } from "@/components";
import { XCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function FailedPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-8">
      {/* Failed Icon and Message */}
      <div className="text-center mb-8">
        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircleIcon size={48} className="text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-red-700 mb-4">
          Compra não realizada!
        </h1>

        <p className="text-gray-600 text-center px-4">
          Infelizmente, não conseguimos processar sua compra. Por favor, tente
          novamente.
        </p>

        <p className="text-gray-600 text-center px-4 mt-2">
          Se o problema persistir, entre em contato com o suporte.
        </p>
      </div>
      <div className="pb-8 max-w-sm mx-auto">
        <Link href={"/checkout"}>
          <Button
            variant="success"
            className="w-full"
            tabIndex={0}
            aria-label="Tentar Novamente"
          >
            Tentar Novamente
          </Button>
        </Link>
      </div>
    </div>
  );
}
