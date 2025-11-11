import { Event } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: Props) {
  const { name, startAt, endAt, slug, thumbnail } = event;

  return (
    <article className={`group cursor-pointer ${className}`}>
      <Link href={`/eventos/${slug}`} className="block focus-ring rounded-lg">
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/3] rounded-lg overflow-hidden mb-3">
          <Image
            src={thumbnail || "/app/image-not-found.png"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </div>

        <div className="flex gap-4">
          {/* {isDateRange ? ( */}
          <div className="flex flex-col justify-center items-center gap-4 border border-[#E0E0E0] min-h-[140px] rounded-lg px-3 py-2 min-w-[60px]">
            <div className="flex flex-col items-center justify-center">
              <div className="text-lg font-bold leading-none text-primary">
                {new Date(startAt).getDate()}
              </div>
              <div className="text-sm uppercase leading-none mt-1">
                {new Date(startAt)
                  .toLocaleString("default", {
                    month: "short",
                  })
                  .padStart(3, "0")}
              </div>
            </div>
            {!(
              new Date(startAt).getDate() === new Date(endAt).getDate() &&
              new Date(startAt).toLocaleString("default", {
                month: "short",
              }) ===
                new Date(endAt).toLocaleString("default", { month: "short" })
            ) && (
              <>
                <div className="text-gray-400 w-full text-sm flex items-center justify-center gap-1">
                  <hr className="w-full" />
                  <h2 className="text-sm">a</h2>
                  <hr className="w-full" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-lg font-bold leading-none text-primary">
                    {new Date(endAt).getDate()}
                  </div>
                  <div className="text-sm uppercase leading-none mt-1">
                    {new Date(endAt).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* // ) : (
          //   // Single date display
          //   <div className="flex flex-col items-center justify-center rounded-lg px-3 py-2 min-w-[60px] min-h-max border border-[#E0E0E0]">
          //     <div className="text-lg font-bold leading-none text-primary">
          //       {date.day}
          //     </div>
          //     <div className="text-sm uppercase leading-none mt-1">
          //       {date.month}
          //     </div>
          //   </div>
          // )} */}

          <div className="flex flex-col flex-1 space-y-2  min-w-0">
            <h3 className="text-base font-semibold text-primary group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            {/* <p className="text-sm text-gray-600">{location}</p> */}
            <hr className="border-[#E0E0E0] " />
            <div className="">
              <span className="text-sm text-gray-500 block">
                Ingressos Apartir De:
              </span>
              <span className="text-lg font-bold text-primary">R$ 50,00</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
