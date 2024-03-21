import { cva } from "cva";

export const button = cva(
  [
    "rounded-md",
    "inline-flex",
    "justify-center",
    "items-center",
    "border-2",
    "hover:cursor-pointer",
    "focus:ring-4",
    "focus:ring-neutral-100",
    "focus:outline-none",
  ],
  {
    variants: {
      variant: {
        solid: [
          "bg-neutral-900",
          "text-neutral-50",
          "border-transparent",
          "hover:bg-neutral-800",
        ],
        outline: [
          "bg-neutral-50",
          "text-neutral-900",
          "border-neutral-900",
          "hover:bg-neutral-200",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        large: ["text-base", "py-2", "px-4", "sm:px-8"],
      },
    },
  }
);
