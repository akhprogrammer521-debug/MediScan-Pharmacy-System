type TableProps = {
  children: React.ReactNode;
};

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}
  