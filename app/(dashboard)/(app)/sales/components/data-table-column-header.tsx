import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  children?: React.ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  title,
  className,
  children,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='ghost'
        size='sm'
        className=' h-auto p-5 data-[state=open]:bg-accent w-full rounded-none'
      >
        <span className='uppercase md:text-lg font-medium text-[#090F1C]'>
          {children ? children : title}
        </span>
      </Button>
    </div>
  );
}
