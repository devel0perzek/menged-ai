import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const textVariants = cva("text-wrap tracking-tight", {
  variants: {
    variant: {
      default: "text-neutral-800 font-medium",
      span: "text-neutral-600",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      eel: "text-2xl",
      eeel: "text-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type T_TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants>;

const Text = forwardRef<HTMLParagraphElement, T_TextProps>(
  ({ variant, size, children }, ref) => {
    return (
      <p ref={ref} className={cn(textVariants({ variant, size }))}>
        {children}
      </p>
    );
  },
);

Text.displayName = "Text";

export { Text, textVariants };
