"Use client";
import { BannerItem, LoginForm } from "@/components";
import { Card, CardContent } from "@/components/cards";
import { CircularStepIndicator } from "@/components/steps";
import { authBanner } from "@/mocks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticação - Beach Ticket",
  description: "Autenticação - Beach Ticket",
};

export default function Auth() {
  const banner = authBanner[0];

  return (
    <div className="w-full flex flex-col relative items-center justify-start">
      <div className="w-full z-20 flex justify-center px-4 -mt-40 pb-8">
        <LoginForm />
      </div>
    </div>
  );
}
