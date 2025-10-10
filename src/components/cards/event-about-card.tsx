import { SpinnerGapIcon, XCircleIcon } from "@phosphor-icons/react/dist/ssr";
import sanitizeHtml from "sanitize-html";

interface EventAboutCardProps {
  description: string;
  isLoading?: boolean;
  error?: string | null;
}

export const EventAboutCard = ({
  description,
  isLoading = false,
  error = null,
}: EventAboutCardProps) => {
  const sanitizedDescription = sanitizeHtml(description || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "span"]),
    allowedAttributes: {
      "*": ["style", "class"],
      a: ["href", "target"],
      img: ["src", "alt"],
    },
  });

  const hasHTML = /<\/?[a-z][\s\S]*>/i.test(sanitizedDescription);

  if (isLoading) {
    return (
      <div className="md:px-6 lg:px-0 mt-8">
        <div className="mb-4">
          <h3 className="font-[Montserrat]">
            <span className="text-gray-900 text-[14px] md:text-[20px]">
              Sobre o
            </span>
            <br />
            <span className="text-[#5400D6] font-bold text-[20px] md:text-[32px]">
              Evento
            </span>
          </h3>
        </div>
        <div className="flex justify-center items-center py-8">
          <SpinnerGapIcon size={32} className="animate-spin text-[#5400D6]" />
          <span className="ml-2 text-gray-600">Carregando informações...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:px-6 lg:px-0 mt-8">
        <div className="mb-4">
          <h3 className="font-[Montserrat]">
            <span className="text-gray-900 text-[14px] md:text-[20px]">
              Sobre o
            </span>
            <br />
            <span className="text-[#5400D6] font-bold text-[20px] md:text-[32px]">
              Evento
            </span>
          </h3>
        </div>
        <div className="flex justify-center items-center py-8 text-red-600">
          <XCircleIcon size={24} />
          <span className="ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="md:px-6 lg:px-0 mt-8">
      <div className="mb-4">
        <h3 className="font-[Montserrat]">
          <span className="text-gray-900 text-[14px] md:text-[20px]">
            Sobre o
          </span>
          <br />
          <span className="text-[#5400D6] font-bold text-[20px] md:text-[32px]">
            Evento
          </span>
        </h3>
      </div>

      <div className="bg-white rounded-lg p-4">
        {hasHTML ? (
          <div
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        ) : (
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {description}
          </pre>
        )}
      </div>
    </div>
  );
};
