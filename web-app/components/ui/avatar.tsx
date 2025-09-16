// components/ui/avatar.tsx
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva("rounded-full object-cover", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type T_AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> &
  VariantProps<typeof avatarVariants>;

export function Avatar({ size, className, ...props }: T_AvatarProps) {
  return <img className={cn(avatarVariants({ size }), className)} {...props} />;
}
