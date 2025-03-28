import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  children?: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  children,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}> {children ? children : title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className=" h-auto p-5 data-[state=open]:bg-accent w-full rounded-none"
        onClick={() => column.toggleSorting()}
      >
        <span className="uppercase md:text-lg font-bold text-[#090F1C]">
          {children ? children : title}
        </span>
        {column.getIsSorted() === "desc" ? (
          <Icons.ArrowFilledDown />
        ) : column.getIsSorted() === "asc" ? (
          <Icons.ArrowFilledUp />
        ) : (
          <Icons.ArrowSort />
        )}
      </Button>
    </div>
  );
}
