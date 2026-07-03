import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs uppercase tracking-widest font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-coffee-950 text-coffee-50 shadow-xl hover:bg-coffee-900",
        destructive:
          "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90",
        outline:
          "border border-coffee-950/20 bg-transparent text-coffee-950 shadow-sm hover:bg-coffee-950/5",
        secondary:
          "bg-coffee-100 text-coffee-950 shadow-sm hover:bg-coffee-200",
        ghost: "hover:bg-coffee-100 hover:text-coffee-900 text-coffee-950",
        link: "text-coffee-950 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 rounded-full px-6 text-[10px]",
        lg: "h-14 rounded-full px-10 py-5 text-xs",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
