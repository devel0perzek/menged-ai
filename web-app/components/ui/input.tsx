import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const inputVariants = cva(
  "h-10 rounded-xl p-2 font-medium tracking-tight text-neutral-800",
  {
    variants: {},
    defaultVariants: {},
  },
);

type T_InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = forwardRef<HTMLInputElement, T_InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input ref={ref} className={cn(inputVariants(), className)} {...props} />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
