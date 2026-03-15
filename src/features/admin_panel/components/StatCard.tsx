const StatCard = ({ label, value, trend }: { label: string; value: string; trend?: string }) => (
  <div className="stat-card col-span-1 flex flex-col justify-between h-40">
    <span className="text-secondary text-sm font-medium">{label}</span>
    <div className="flex items-end justify-between" dir="ltr">
      <h2 className="text-3xl font-bold text-text">{value}</h2>
      {trend && <span className="bg-background text-primary text-xs font-bold px-3 py-1 rounded-full">{trend}</span>}
    </div>
  </div>
);

export default StatCard;
