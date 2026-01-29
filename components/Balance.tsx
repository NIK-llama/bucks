export function Balance({ value }: { value: string }) {
  return (
    <div className="flex items-center px-8 py-6">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold text-lg ml-4">Rs {value}</div>
    </div>
  );
}