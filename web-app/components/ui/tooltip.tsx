import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const tooltipVariants = cva(
  "w-auto rounded-xl overflow-hidden absolute z-50 shadow-lg pointer-events-none",
  {
    variants: {
      position: {
        top: `
          bottom-full left-1/2 -translate-x-1/2 mb-2
          opacity-0 scale-95 translate-y-1
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transition-all duration-150 ease-out
        `,
        bottom: `
          top-full left-1/2 -translate-x-1/2 mt-2
          opacity-0 scale-95 -translate-y-1
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transition-all duration-150 ease-out
        `,
        left: `
          right-full top-1/2 -translate-y-1/2 mr-2
          opacity-0 scale-95 translate-x-1
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0
          transition-all duration-150 ease-out
        `,
        right: `
          left-full top-1/2 -translate-y-1/2 ml-2
          opacity-0 scale-95 -translate-x-1
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0
          transition-all duration-150 ease-out
        `,
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

type T_TooltipProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tooltipVariants>;

const Tooltip = forwardRef<HTMLDivElement, T_TooltipProps>(
  ({ children, position, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(tooltipVariants({ position }))} {...props}>
        {children}
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
