"use client";

import { useState } from "react";
import { ContactForm, PersonalDataForm } from "../forms";
import { CircularStepIndicator } from "../steps";
import { Card, CardContent } from "./card";
import { ICreateUser } from "@/interfaces";

export const RegisterCard = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [newUser, setNewUser] = useState<ICreateUser | null>(null);

  return (
    <Card className="w-full not-lg:max-w-md lg:min-w-192 bg-white rounded-2xl shadow-2xl">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CircularStepIndicator
              currentStep={currentStep}
              totalSteps={2}
              size={60}
            />
            <div>
              <h2 className="text-[20px] leading-[28px] font-semibold text-primary">
                {currentStep === 1 ? "Dados Pessoais" : "Contato"}
              </h2>
              <p className="text-[14px] leading-[16px] text-[#6E7278]">
                {currentStep === 1 ? "Próxima etapa: Contato" : "Etapa final"}
              </p>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <PersonalDataForm
            onStepChange={setCurrentStep}
            newUser={newUser}
            setNewUser={setNewUser}
          />
        )}

        {currentStep === 2 && (
          <ContactForm
            setCurrentStep={setCurrentStep}
            newUser={newUser}
            setNewUser={setNewUser}
          />
        )}
      </CardContent>
    </Card>
  );
};
