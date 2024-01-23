import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: Readonly<React.ReactNode>;
};

export default function MaxWidthWrapper({ className, children }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}
