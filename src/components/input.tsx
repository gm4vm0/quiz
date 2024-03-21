import { cva } from "cva";

export const input = cva(["w-full"], {
  variants: {
    variant: {
      primary: [
        "bg-neutral-50",
        "border-2",
        "border-neutral-900",
        "rounded-md",
        "text-neutral-900",
        "text-sm",
        "p-2",
        "focus:ring-4",
        "focus:ring-neutral-100",
        "focus:outline-none",
      ],
    },
  },
  defaultVariants: { variant: "primary" },
});
