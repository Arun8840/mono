import DragItems from "@/modules/dashboard/Drag-items";
import { Spinner } from "@repo/ui/components";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-3">
          <Spinner />
        </div>
      }
    >
      <DragItems />
    </Suspense>
  );
}

export default page;
