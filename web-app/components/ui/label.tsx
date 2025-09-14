import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const labelVariants = cva("block text-wrap tracking-tight font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

type T_LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {};
const Label = ({ className, ...props }: T_LabelProps) => {
  return <label className={cn(labelVariants(), className)} {...props} />;
};

Label.displayName = "Label";

export { Label, labelVariants };
