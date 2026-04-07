"use client";

import { useEffect, useRef, useState } from "react";

const JALALI_MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

const YEAR_START = 1300;

const getCurrentJalaliYear = () => {
  const gregorianDate = new Date();
  const jalaliYearString = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
  }).format(gregorianDate);
  return parseInt(jalaliYearString, 10);
};

const YEAR_END = getCurrentJalaliYear();

function isJalaliLeap(year: number): boolean {
  const remainders = [1, 5, 9, 13, 17, 22, 26, 30];
  return remainders.includes(year % 33);
}

function getDaysInMonthFixed(month: number, year: number): number {
  if (month >= 1 && month <= 6) return 31;
  if (month >= 7 && month <= 11) return 30;
  return isJalaliLeap(year) ? 30 : 29;
}

const ITEM_HEIGHT = 44;
const VISIBLE = 5;

interface DrumColumnProps {
  items: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

function DrumColumn({ items, selectedIndex, onChange }: DrumColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = selectedIndex * ITEM_HEIGHT;
  }, [selectedIndex]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    if (clamped !== selectedIndex) onChange(clamped);
  };

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: ITEM_HEIGHT * VISIBLE }}>
      {/* selection highlight */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10 border-y border-primary/30 bg-primary/5"
        style={{ top: ITEM_HEIGHT * 2, height: ITEM_HEIGHT }}
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-y-scroll h-full scrollbar-hide snap-y snap-mandatory"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* padding top/bottom so first/last items can center */}
        <div style={{ height: ITEM_HEIGHT * 2 }} />
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              onChange(i);
              containerRef.current?.scrollTo({ top: i * ITEM_HEIGHT, behavior: "smooth" });
            }}
            className="flex items-center justify-center text-sm font-medium cursor-pointer snap-center transition-colors"
            style={{
              height: ITEM_HEIGHT,
              color: i === selectedIndex ? "var(--color-primary, #2F3E46)" : "#9CA3AF",
              fontWeight: i === selectedIndex ? 700 : 400,
            }}
          >
            {item}
          </div>
        ))}
        <div style={{ height: ITEM_HEIGHT * 2 }} />
      </div>
    </div>
  );
}

interface PersianDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function PersianDatePicker({ value, onChange, onClose }: PersianDatePickerProps) {
  const years = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => String(YEAR_START + i));
  const months = JALALI_MONTHS;

  const parsed = value?.split("/");
  const initYear = parsed?.[0] ? parseInt(parsed[0]) : 1380;
  const initMonth = parsed?.[1] ? parseInt(parsed[1]) : 1;
  const initDay = parsed?.[2] ? parseInt(parsed[2]) : 1;

  const [yearIdx, setYearIdx] = useState(Math.max(0, initYear - YEAR_START));
  const [monthIdx, setMonthIdx] = useState(Math.max(0, initMonth - 1));
  const [dayIdx, setDayIdx] = useState(Math.max(0, initDay - 1));

  const selectedYear = YEAR_START + yearIdx;
  const selectedMonth = monthIdx + 1;
  const daysCount = getDaysInMonthFixed(selectedMonth, selectedYear);
  const days = Array.from({ length: daysCount }, (_, i) => String(i + 1).padStart(2, "0"));

  useEffect(() => {
    if (dayIdx >= daysCount) setDayIdx(daysCount - 1);
  }, [daysCount]);

  const handleConfirm = () => {
    const y = String(selectedYear);
    const m = String(selectedMonth).padStart(2, "0");
    const d = String(dayIdx + 1).padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#2F3E46]/40 backdrop-blur-sm">
      <div
        dir="rtl"
        className="w-full sm:max-w-sm bg-white rounded-t-[24px] sm:rounded-[24px] shadow-xl p-6 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
      >
        <h3 className="text-base font-bold text-text text-center mb-4">انتخاب تاریخ تولد</h3>

        <div className="flex gap-2 mb-6" style={{ direction: "rtl" }}>
          {/* Year */}
          <DrumColumn items={years} selectedIndex={yearIdx} onChange={setYearIdx} />
          {/* Month */}
          <DrumColumn items={months} selectedIndex={monthIdx} onChange={setMonthIdx} />
          {/* Day */}
          <DrumColumn items={days} selectedIndex={dayIdx} onChange={setDayIdx} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[12px] bg-[#F0F4F2] text-text font-bold text-sm hover:bg-[#CAD2C5]/50 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-[12px] bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}
