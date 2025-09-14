import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef, useEffect, useRef } from "react";

const textAreaVariants = cva(
  "rounded-xl p-2 w-full outline-none tracking-tight text-neutral-800 resize-none transition-all duration-200 ease-in-out",
  {
    variants: {
      maxHeight: {
        sm: "max-h-24",
        md: "max-h-40",
        lg: "max-h-60",
        none: "max-h-none",
      },
    },
    defaultVariants: {
      maxHeight: "md",
    },
  },
);

type T_TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>;

const TextArea = forwardRef<HTMLTextAreaElement, T_TextAreaProps>(
  ({ maxHeight, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;

      const handleInput = () => {
        el.style.height = "auto"; // reset
        el.style.height = `${el.scrollHeight}px`; // expand smoothly
      };

      handleInput();
      el.addEventListener("input", handleInput);
      return () => el.removeEventListener("input", handleInput);
    }, []);

    return (
      <textarea
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref)
            (
              ref as React.MutableRefObject<HTMLTextAreaElement | null>
            ).current = node;
          internalRef.current = node;
        }}
        className={cn(textAreaVariants({ maxHeight }))}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";
export { TextArea, textAreaVariants };
