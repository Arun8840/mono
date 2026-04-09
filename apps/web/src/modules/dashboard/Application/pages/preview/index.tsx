"use client";
import { client } from "@repo/server/client";
import { Spinner } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComponentRegistry } from "../design/ui/Registry";
import { componentType } from "@/types/global";

type PagePreviewProps = {
  appId: string;
  pageId: string;
};

const ROW_HEIGHT = 10;
const GRID_COLUMNS = 240;

const PreviewFallback = ({ isError }: { isError: boolean }) => (
  <div className="size-full grid place-items-center">
    {isError ? (
      <p className="text-destructive">Something went wrong</p>
    ) : (
      <Spinner />
    )}
  </div>
);

function PreviewModule({ appId, pageId }: PagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    colWidth: 0,
    rowHeight: ROW_HEIGHT,
  });

  useEffect(() => {
    if (!containerRef?.current) return;
    const updateSize = () => {
      const width = containerRef.current?.getBoundingClientRect().width || 0;
      setDimensions({
        colWidth: width / GRID_COLUMNS,
        rowHeight: ROW_HEIGHT,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { data, isPending, isError } = useQuery({
    queryKey: ["page", appId, pageId],
    queryFn: async () => {
      const { data, error } = await client.app.pages
        .component({ pageId })
        .get();

      if (error) {
        throw new Error(error.value?.message || "Failed to fetch components");
      }

      return data;
    },
    enabled: Boolean(appId && pageId),
  });

  const pageItems = useMemo(() => data?.data, [data]);
  const backgroundStyle = useMemo(() => {
    if (pageItems?.styles?.gradient) {
      return { background: pageItems?.styles?.background };
    }
    return { backgroundColor: pageItems?.styles?.backgroundColor || "#ffffff" };
  }, [pageItems?.styles]);

  const renderComponents = useMemo(() => {
    if (!pageItems?.components) return null;

    return pageItems.components.map((comp) => {
      const Component =
        ComponentRegistry[comp.type as keyof typeof ComponentRegistry];
      if (!Component) return null;

      return (
        <Component
          key={comp.id}
          value={comp as componentType}
          dimensions={dimensions}
          isPreview={true}
        />
      );
    });
  }, [pageItems?.components, dimensions]);

  if (isPending || isError) {
    return <PreviewFallback isError={isError} />;
  }

  return (
    <div ref={containerRef} className="p-2 size-full">
      <div
        className="size-full grid relative"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
          gridAutoRows: `${ROW_HEIGHT}px`,
          gap: 0,
          padding: 0,
          position: "relative",
          ...backgroundStyle,
        }}
      >
        {renderComponents}
      </div>
    </div>
  );
}

export default React.memo(PreviewModule);
