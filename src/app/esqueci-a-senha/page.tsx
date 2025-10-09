import { RecoverPasswordForm } from "@/components";
import { Suspense } from "react";

export default function ForgotPassword() {
  return (
    <div className="w-full h-full flex flex-col relative items-center justify-center mb-74">
      <div className="absolute w-full z-20 flex justify-center px-4">
        <Suspense
          fallback={
            <div className="w-full max-w-md px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                  <div className="w-full space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                  <div className="w-full h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          }
        >
          <RecoverPasswordForm />;
        </Suspense>
      </div>
    </div>
  );
}
