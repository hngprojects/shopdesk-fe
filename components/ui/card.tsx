import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-xl border shadow-sm", 
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        outlined: "bg-white border-2",
        elevated: "bg-white shadow-md",
        ghost: "bg-transparent border-none shadow-none"
      },
      size: {
        default: "w-full",
        sm: "w-64",
        md: "w-80",
        lg: "w-96"
      },
      highlight: {
        true: "border-primary border-2",
        false: ""
      },
      layout: {
        col: "flex flex-col gap-6",
        row: "flex flex-row items-center gap-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      highlight: false,
      layout: "col"
    }
  }
)

interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(({ 
  className, 
  variant, 
  size, 
  highlight, 
  layout,
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(cardVariants({ variant, size, highlight, layout, className }))}
      {...props}
    >
      {children}
    </div>
  )
})
CardRoot.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  )
})
CardHeader.displayName = "Card.Header"

const CardTitle = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("text-xl leading-none font-semibold", className)}
      {...props}
    />
  )
})
CardTitle.displayName = "Card.Title"

const CardDescription = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
})
CardDescription.displayName = "Card.Description"

const CardContent = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-6 flex-grow", className)}
      {...props}
    />
  )
})
CardContent.displayName = "Card.Content"

const CardFooter = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6 mt-auto", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "Card.Footer"

// Helper function for simple card creation
const createCard = (
  content: React.ReactNode,
  title?: React.ReactNode,
  description?: React.ReactNode,
  footer?: React.ReactNode,
  cardProps?: Omit<CardProps, 'children'>
) => {
  return (
    <CardRoot {...cardProps}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardRoot>
  );
};


const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  create: createCard
});


export { Card }