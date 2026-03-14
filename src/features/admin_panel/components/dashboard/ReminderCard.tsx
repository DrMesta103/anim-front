const ReminderCard = ({ title, desc, urgent = false }: { title: string; desc: string; urgent?: boolean }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border-r-4 border-primary">
    <h4 className={`text-sm font-bold ${urgent ? "text-red-500" : "text-text"}`}>{title}</h4>
    <p className="text-xs text-secondary mt-1">{desc}</p>
  </div>
);

export default ReminderCard;
