import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ErrorFallback } from "./ErrorFallback";

export const RouteErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen p-4 xl:p-6">
        <ErrorFallback
          title={`${error.status} - ${error.statusText}`}
          description="Sahifa yoki route yuklanmadi. Bosh sahifaga qaytib davom etishingiz mumkin."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 xl:p-6">
      <ErrorFallback />
    </div>
  );
};
