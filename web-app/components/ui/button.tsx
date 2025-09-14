import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const buttonVariants = cva(
  "h-10 w-fit text-sm cursor-pointer font-medium transition-all duration-2 tracking-tight flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-white border-none px-4",
        ghost: "bg-none hover:bg-neutral-200",
        icon: "w-10 rounded-full border border-neutral-200 hover:bg-neutral-100",
        outline: "border border-neutral-200",

        // 3D base styles
        threeD: `
          px-32 border-none font-semibold opacity-100
          shadow-[0_4px_0_0_var(--shadow-color)]
          active:translate-y-[2px] disabled:translate-y-[0px] disabled:shadow-none disabled:opacity-50 active:shadow-[0_1px_0_0_var(--shadow-color)]
        `,
      },
      threeDColor: {
        blue: `
          bg-blue-500 text-white
          shadow-blue-600 
        `,
        neutral: `bg-neutral-700 text-white shadow-neutral-950`,
        secondary: `bg-neutral-300 text-black shadow-neutral-400`,
        green: `
          bg-green-600 text-white bg-green-500
          shadow-green-700
        `,
        gold: `
          bg-yellow-400 text-neutral-900
          shadow-yellow-800
        `,
      },
      rounded: {
        full: "rounded-full",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "xl",
    },
    compoundVariants: [
      // only apply threeDColor when variant is threeD
      {
        variant: "threeD",
        threeDColor: "green",
      },
    ],
  },
);

type T_ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, T_ButtonProps>(
  ({ variant, rounded, threeDColor, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, rounded, threeDColor }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
