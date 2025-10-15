import { QuestionIcon } from "@phosphor-icons/react/dist/ssr";

export default function SuccessPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-8">
      {/* Success Icon and Message */}
      <div className="text-center mb-8">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <QuestionIcon size={48} className="text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Esta precisando de ajuda?
        </h1>

        <p className="text-gray-600 text-center px-4">
          Se você tiver alguma dúvida ou precisar de assistência, não hesite em
          nos contatar através do nosso suporte ao cliente.
        </p>

        <p className="text-gray-600 text-center px-4 mt-2">
          Telefone: (11) 1234-5678
        </p>

        <p className="text-gray-600 text-center px-4 mt-2">
          E-mail: suporte@exemplo.com
        </p>

        <p className="text-gray-600 text-center px-4 mt-2">
          Estamos aqui para ajudar!
        </p>
      </div>
    </div>
  );
}
