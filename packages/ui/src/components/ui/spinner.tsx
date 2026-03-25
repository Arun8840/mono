import { cn } from "@repo/ui/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const strokeWidth: any = props.strokeWidth;
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}

export { Spinner };
