import { RegisterCard } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar",
  description: "Registrar",
};

export default function RegisterPage() {
  return (
    <div className="w-full flex flex-col relative items-center justify-start">
      <div className="w-full z-20 flex justify-center px-4 -mt-40 pb-8">
        <RegisterCard />
      </div>
    </div>
  );
}
