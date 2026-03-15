import ReminderCard from "@/features/admin_panel/components/dashboard/ReminderCard";
import StatCard from "@/features/admin_panel/components/dashboard/StatCard";
import { formatFaPrice } from "@/shared/lib/formatFaPrice";

const AdminDashboard: React.FC = () => {
  return (
    <main className="flex-1 p-4 md:p-10 overflow-y-auto min-w-0">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-text tracking-tight">نمای کلی داشبورد</h1>
        <div className="flex gap-4">
          <button className="bg-white p-3 rounded-xl border border-accent/20 text-text hover:bg-accent/10 transition-colors shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:gap-12">
          <StatCard label="مجموع پزشکان" value={formatFaPrice(24)} trend={`+${formatFaPrice(2)}`} />
          <StatCard label="تخصص ها" value={`${formatFaPrice(0)}${formatFaPrice(8)}`} />
          <StatCard label="اتاق های فعال" value={formatFaPrice(102)} trend={`-${formatFaPrice(12)}`} />

          <div className="col-span-1 md:col-span-3 2xl:col-span-4 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-accent/20 relative overflow-hidden">
            <h3 className="text-lg font-bold text-text mb-2">ترافیک جلسات</h3>
            <p className="text-xs text-secondary mb-10">فعالیت کلینیک در ماه گذشته</p>
            <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-background/50 rounded-2xl border-2 border-dashed border-accent flex items-center justify-center text-secondary italic"></div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4 bg-accent/10 p-6 rounded-[2rem] md:rounded-[2.5rem] self-start">
          <h3 className="text-lg font-bold text-text mb-4 px-2">اتفاقات اخیر</h3>
          <div className="space-y-4">
            <ReminderCard title="اتاق ۴ طبقه ۲" desc="به دلیل تعمیرات غیر فعال شد" />
            <ReminderCard urgent title="کنسل شده: دکتر حیدری" desc="شیفت صبح ۲۳ اسفند ۱۴۰۴" />
            <ReminderCard title="پزشک جدید" desc="دکتر غلامی با تخصص روانشناسی بالینی" />
            <ReminderCard title="تخصص جدید" desc="نيورولوژی" />
          </div>

          {/* <button className="w-full mt-6 py-4 bg-white border-2 border-dashed border-primary/30 text-primary font-bold rounded-2xl hover:bg-white/50 transition-all text-sm">
            + Add New Note
          </button> */}
        </div>

        <div className="col-span-12 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-accent/10 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-text">جلسه های فعال اخیر</h3>
            <button className="text-primary font-bold text-sm hover:underline shrink-0">مشاهده همه</button>
          </div>

          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="table-header">نام بیمار</th>
                  <th className="table-header">پزشک مربوطه</th>
                  <th className="table-header">اتاق</th>
                  <th className="table-header">زمان</th>
                  <th className="table-header">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-cell font-semibold text-text">مجید ایزدی</td>
                  <td className="table-cell">دکتر غلامی</td>
                  <td className="table-cell">اتاق ۳ همکف</td>
                  <td className="table-cell">
                    {formatFaPrice(10)}:{formatFaPrice(30)} ق.ظ
                  </td>
                  <td className="table-cell">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold">رزرو</span>
                  </td>
                </tr>
                <tr>
                  <td className="table-cell font-semibold text-text">نیوشا عزیزی</td>
                  <td className="table-cell">دکتر طباطبایی</td>
                  <td className="table-cell">اتاق ۲ طبقه ۳</td>
                  <td className="table-cell">
                    {formatFaPrice(2)}:{formatFaPrice(45)} ب.ظ
                  </td>
                  <td className="table-cell">
                    <span className="bg-accent text-text px-4 py-1.5 rounded-full text-xs font-bold">تمام شده</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
