import Application from "@/modules/dashboard/Application";
import { Spinner } from "@repo/ui/components";
import React, { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-3">
          <Spinner />
        </div>
      }
    >
      <Application />
    </Suspense>
  );
}

export default Page;
