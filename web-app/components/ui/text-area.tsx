import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const textAreaVariants = cva(
  "rounded-xl p-2 min-h-24 w-full outline-none tracking-tight text-neutral-800",
  {
    variants: {},
  },
);

type T_TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>;

const TextArea = forwardRef<HTMLTextAreaElement, T_TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textAreaVariants(), className)}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
export { TextArea, textAreaVariants };
