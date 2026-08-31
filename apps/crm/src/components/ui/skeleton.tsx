import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[#101524] border border-[rgba(201,166,107,0.06)]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
