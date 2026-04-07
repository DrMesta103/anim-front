export default function StatusDot({ deletedAt }: { deletedAt: Date | null }) {
  const color = deletedAt ? "bg-[#F5A623]" : "bg-[#52796F]";
  return <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${color}`} />;
}
