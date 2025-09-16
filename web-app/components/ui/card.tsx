// components/ui/card.tsx
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const cardVariants = cva(
  "rounded-xl border border-neutral-200 bg-white shadow-sm p-4",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border-2",
        ghost: "shadow-none border-none bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type T_CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = forwardRef<HTMLDivElement, T_CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export { Card, cardVariants };
