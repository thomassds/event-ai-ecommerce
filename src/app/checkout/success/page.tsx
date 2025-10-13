import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function SuccessPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-8">
      {/* Success Icon and Message */}
      <div className="text-center mb-8">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircleIcon size={48} className="text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Compra realizada com sucesso!
        </h1>

        <p className="text-gray-600 text-center px-4">
          Obrigado por sua compra! Seu pedido foi processado com sucesso.
        </p>

        <p className="text-gray-600 text-center px-4 mt-2">
          Enviamos uma cópia dos seus ingressos para seu e-mail cadastrado.
        </p>
      </div>
    </div>
  );
}
