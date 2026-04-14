"use client";

import { AppDispatch, RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSchedulePage, setSelectedDoctor } from "../../slice";
import { getPersianDates } from "@/shared/lib/persianDate";
import { subWeeks } from "date-fns-jalali";

const doctorData = {
  name: "دکتر آلیس ونس",
  specialty: "قلب و عروق",
  room: "اتاق 204",
  weeklyHours: "32 ساعت",
  weeklyBookedPercentage: 64,
  cancellations: 2,
};

const weekDays = [
  { day: "شنبه", date: "15", isToday: false },
  { day: "یک‌شنبه", date: "16", isToday: false },
  { day: "دوشنبه", date: "17", isToday: false },
  { day: "سه‌شنبه", date: "18", isToday: true },
  { day: "چهارشنبه", date: "19", isToday: false },
  { day: "پنج‌شنبه", date: "20", isToday: false },
  { day: "جمعه", date: "21", isToday: false },
];

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const availability = [{ start: 8, end: 15 }, { start: 9, end: 17 }, { start: 8, end: 13 }, { start: 8, end: 13 }, null, { start: 9, end: 15 }, null];

const appointments = [
  { id: 1, day: 0, startTime: 8.5, duration: 0.75, patient: "جان دو", time: "08:30 - 09:15", status: "completed" },
  { id: 2, day: 0, startTime: 10, duration: 0.75, patient: "سارا جنکینز", time: "10:00 - 10:45", status: "canceled" },
  { id: 3, day: 0, startTime: 13, duration: 1, patient: "مایکل چنگ", time: "13:00 - 14:00", status: "scheduled" },
  { id: 4, day: 3, startTime: 9, duration: 1, patient: "امیلی بلانت", time: "09:00 - 10:00", status: "arrived" },
  { id: 5, day: 3, startTime: 11.5, duration: 0.75, patient: "دیوید ال.", time: "11:30 - 12:15", status: "scheduled" },
  { id: 6, day: 5, startTime: 9.5, duration: 1, patient: "رابرت مایلز", time: "09:30 - 10:30", status: "scheduled" },
];

const statusConfig = {
  completed: {
    label: "انجام شد",
    bg: "bg-white",
    border: "border-[#84A98C]",
    accent: "bg-[#84A98C]",
    badge: "bg-[#F0F4F2] text-[#84A98C]",
    text: "text-[#2F3E46]",
  },
  canceled: {
    label: "لغو شده",
    bg: "bg-[#FFF0F0]",
    border: "border-[#FF4D4D]",
    accent: "bg-[#FF4D4D]",
    badge: "bg-[#FF4D4D]/10 text-[#FF4D4D]",
    text: "text-[#FF4D4D] line-through",
  },
  scheduled: {
    label: "زمان‌بندی",
    bg: "bg-white",
    border: "border-[#52796F]",
    accent: "bg-[#52796F]",
    badge: "bg-[#E8F4F1] text-[#52796F]",
    text: "text-[#2F3E46]",
  },
  arrived: {
    label: "حاضر",
    bg: "bg-white",
    border: "border-[#52796F]",
    accent: "bg-[#52796F]",
    badge: "bg-[#E8F4F1] text-[#52796F]",
    text: "text-[#2F3E46]",
  },
};

const HOUR_HEIGHT = 60;
const START_HOUR = 6;

const AppointmentCard = ({ appointment }: { appointment: (typeof appointments)[0] }) => {
  const cfg = statusConfig[appointment.status as keyof typeof statusConfig];
  const heightPx = appointment.duration * HOUR_HEIGHT - 4;
  const isShort = heightPx < 50;
  const isTiny = heightPx < 30;

  return (
    <div className={`h-full rounded-lg border ${cfg.bg} ${cfg.border} relative overflow-hidden flex flex-col`} dir="rtl">
      <div className={`absolute top-0 right-0 w-1 h-full ${cfg.accent}`} />
      {isTiny ? (
        <div className="pr-3 pl-2 h-full flex items-center justify-between">
          <p className={`text-[9px] font-bold truncate ${cfg.text}`}>{appointment.patient}</p>
          <span className={`px-1 rounded text-[7px] font-bold shrink-0 ml-1 ${cfg.badge}`}>{cfg.label}</span>
        </div>
      ) : isShort ? (
        <div className="pr-3 pl-2 py-1 flex flex-col gap-0.5 h-full justify-center">
          <div className="flex items-center justify-between gap-1">
            <p className={`text-[10px] font-bold truncate ${cfg.text}`}>{appointment.patient}</p>
            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0 ${cfg.badge}`}>{cfg.label}</span>
          </div>
          <p className="text-[9px] text-[#84A98C]">{appointment.time}</p>
        </div>
      ) : (
        <div className="pr-3 pl-2 py-1.5 flex flex-col gap-0.5 h-full">
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold self-end ${cfg.badge}`}>{cfg.label}</span>
          <p className={`text-[10px] font-bold leading-tight ${cfg.text}`}>{appointment.patient}</p>
          <p className="text-[9px] text-[#84A98C]">{appointment.time}</p>
        </div>
      )}
    </div>
  );
};

const DayColumn = ({ dayIdx, currentDay, currentTime }: { dayIdx: number; currentDay: number; currentTime: number }) => (
  <div className="relative border-r border-[#E2E8E4]">
    {timeSlots.map((_, idx) => (
      <div key={idx} className="border-b border-dashed border-[#E2E8E4]" style={{ height: `${HOUR_HEIGHT}px` }} />
    ))}
    {availability[dayIdx] ? (
      <div
        className="absolute inset-x-0 bg-[#E8F4F1]/50 border border-dashed border-[#84A98C] pointer-events-none"
        style={{
          top: `${(availability[dayIdx]!.start - START_HOUR) * HOUR_HEIGHT}px`,
          height: `${(availability[dayIdx]!.end - availability[dayIdx]!.start) * HOUR_HEIGHT}px`,
        }}
      />
    ) : (
      <div className="absolute inset-0 bg-[#FAFCFB]/80 flex items-center justify-center pointer-events-none">
        <span className="text-xs font-bold text-[#CAD2C5]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          روز تعطیل
        </span>
      </div>
    )}
    {appointments
      .filter((apt) => apt.day === dayIdx)
      .map((apt) => (
        <div
          key={apt.id}
          className="absolute inset-x-1"
          style={{
            top: `${(apt.startTime - START_HOUR) * HOUR_HEIGHT + 2}px`,
            height: `${apt.duration * HOUR_HEIGHT - 4}px`,
          }}
        >
          <AppointmentCard appointment={apt} />
        </div>
      ))}
    {dayIdx === currentDay && (
      <div className="absolute inset-x-0 pointer-events-none" style={{ top: `${(currentTime - START_HOUR) * HOUR_HEIGHT}px` }}>
        <div className="w-full h-0.5 bg-[#FF4D4D] relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF4D4D]" />
          <div className="absolute right-3 -top-3 px-1.5 py-0.5 bg-[#FF4D4D] rounded-full">
            <span className="text-[9px] font-bold text-white">09:45</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default function DoctorSchedules() {
  const currentTime = 9.75;
  const currentDay = 3;
  const [mobileDay, setMobileDay] = useState(currentDay);
  const { selectedDoctor, schedulePage } = useSelector((state: RootState) => state.schedules);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("schedule page changed", schedulePage);
    console.log(getPersianDates(subWeeks(new Date(), schedulePage)));
  }, [schedulePage]);

  return (
    <div className="bg-[#F0F4F2] min-h-screen p-4" dir="rtl">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="flex items-center gap-1 text-[#52796F] font-bold text-sm hover:text-[#2F3E46] transition-colors"
            onClick={() => dispatch(setSelectedDoctor(null))}
          >
            <span>→</span>
            <span>برگشت</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-[#52796F] rounded-lg text-sm font-bold text-[#52796F] shadow-sm hover:bg-[#F0F4F2] transition-colors">
              + افزودن شیفت
            </button>
            <button className="px-4 py-2 bg-[#52796F] rounded-lg text-sm font-bold text-white shadow-sm hover:bg-[#2F3E46] transition-colors">
              + رزرو نوبت
            </button>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CAD2C5] to-[#84A98C] flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {selectedDoctor?.firstname[0]} {selectedDoctor?.lastname[0]}
                </span>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#2F3E46]">
                  {selectedDoctor?.firstname} {selectedDoctor?.lastname}
                </h2>
                <p className="text-sm text-[#84A98C]">{selectedDoctor?.doctorProfile.specialty.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-[#84A98C]">کار در این هفته</p>
                <p className="text-sm font-bold text-[#2F3E46] mt-1">{doctorData.weeklyHours}</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-[#E2E8E4]" />
              <div className="text-right">
                <p className="text-xs text-[#84A98C]">ظرفیت تکمیل شده</p>
                <p className="text-sm font-bold text-[#2F3E46] mt-1">{doctorData.weeklyBookedPercentage}%</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-[#E2E8E4]" />
              <div className="text-right">
                <p className="text-xs text-[#84A98C]">لغو شده</p>
                <p className="text-sm font-bold text-[#FF4D4D] mt-1">{doctorData.cancellations} این هفته</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white rounded-xl p-3 mb-4 flex items-center gap-3">
          <button
            className="w-8 h-8 bg-[#F0F4F2] rounded-lg flex items-center justify-center text-[#52796F] font-bold hover:bg-[#E2E8E4]"
            onClick={() => dispatch(setSchedulePage(schedulePage + 1))}
          >
            &lt;
          </button>
          <button
            className="w-8 h-8 bg-[#F0F4F2] rounded-lg flex items-center justify-center text-[#52796F] font-bold hover:bg-[#E2E8E4]"
            onClick={() => dispatch(setSchedulePage(schedulePage - 1))}
          >
            &gt;
          </button>
          <span className="text-sm font-bold text-[#2F3E46]">15 فرودین - 21 فرودین، 1405</span>
          <span className="px-3 py-1 bg-[#E8F4F1] rounded-full text-[11px] font-bold text-[#52796F]">این هفته</span>
        </div>

        {/* ── MOBILE: day switcher tabs + single column ── */}
        <div className="block md:hidden bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Day tabs */}
          <div className="flex border-b border-[#E2E8E4] overflow-x-auto">
            {weekDays.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setMobileDay(idx)}
                className={`flex-1 min-w-[48px] py-2 flex flex-col items-center transition-colors ${
                  mobileDay === idx ? "bg-[#52796F]" : "hover:bg-[#F0F4F2]"
                }`}
              >
                <span className={`text-[10px] ${mobileDay === idx ? "text-white" : "text-[#84A98C]"}`}>{day.day}</span>
                <span className={`text-sm font-bold ${mobileDay === idx ? "text-white" : "text-[#2F3E46]"}`}>{day.date}</span>
              </button>
            ))}
          </div>
          {/* Single day grid */}
          <div className="relative grid grid-cols-[48px_1fr]">
            <div className="border-r border-[#E2E8E4]">
              {timeSlots.map((time, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-end pr-1 pt-1 text-[10px] text-[#84A98C] border-b border-dashed border-[#E2E8E4]"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                >
                  {time}
                </div>
              ))}
            </div>
            <DayColumn dayIdx={mobileDay} currentDay={currentDay} currentTime={currentTime} />
          </div>
        </div>

        {/* ── DESKTOP: full 7-column grid ── */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-[56px_repeat(7,1fr)] bg-[#FAFCFB] border-b border-[#E2E8E4]">
            <div />
            {weekDays.map((day, idx) => (
              <div key={idx} className="p-3 text-center border-r border-[#E2E8E4]">
                {day.isToday ? (
                  <div className="inline-flex flex-col items-center justify-center w-12 h-12 bg-[#52796F] rounded-xl mx-auto">
                    <span className="text-[10px] text-white">{day.day}</span>
                    <span className="text-sm font-bold text-white">{day.date}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-[#84A98C]">{day.day}</p>
                    <p className="text-sm font-bold text-[#2F3E46] mt-1">{day.date}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="relative grid grid-cols-[56px_repeat(7,1fr)]">
            <div className="border-r border-[#E2E8E4]">
              {timeSlots.map((time, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-end pr-2 pt-1 text-[10px] text-[#84A98C] border-b border-dashed border-[#E2E8E4]"
                  style={{ height: `${HOUR_HEIGHT}px` }}
                >
                  {time}
                </div>
              ))}
            </div>
            {weekDays.map((_, dayIdx) => (
              <DayColumn key={dayIdx} dayIdx={dayIdx} currentDay={currentDay} currentTime={currentTime} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
