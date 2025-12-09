import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-blue-100 text-blue-800 border border-blue-200",
        secondary:
          "bg-gray-100 text-gray-800 border border-gray-200",
        destructive:
          "bg-red-100 text-red-800 border border-red-200",
        success:
          "bg-green-100 text-green-800 border border-green-200",
        warning:
          "bg-yellow-100 text-yellow-800 border border-yellow-200",
        outline: 
          "border border-gray-300 text-gray-700 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
