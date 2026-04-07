"use client";

import { AppDispatch, RootState } from "@/store";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroupsOfSpecialtiesThunk } from "../../hooks";
import { GroupOfDoctors } from "../../types";
import SpecialtySection from "./SpecialtySection";
import { setSearch, setSelectedSpecialtyId } from "../../slice";

function buildIndexMap(data: GroupOfDoctors[]) {
  const map: { sectionIndex: number; positionInSection: number }[] = [];
  data.forEach((section, sIdx) => {
    const docs = Array.isArray(section.doctors) ? section.doctors : [section.doctors];
    docs.forEach((_, dIdx) => map.push({ sectionIndex: sIdx, positionInSection: dIdx }));
  });
  return map;
}

export default function DoctorDirectory() {
  const dispatch: AppDispatch = useDispatch();
  const { groups, status, search, selectedSpecialtyId } = useSelector((state: RootState) => state.schedules);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const indexMap = buildIndexMap(groups);
  const totalCards = indexMap.length;

  useEffect(() => {
    dispatch(fetchAllGroupsOfSpecialtiesThunk());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveCardIndex((prev) => (prev < totalCards - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveCardIndex((prev) => {
          const current = indexMap[prev];
          if (!current) return prev;
          const sectionLen = Array.isArray(groups[current.sectionIndex].doctors) ? (groups[current.sectionIndex].doctors as any[]).length : 1;
          const sameRowNext = prev + sectionLen;
          if (sameRowNext < totalCards) return sameRowNext;
          let nextStart = 0;
          for (let s = 0; s <= current.sectionIndex; s++) {
            nextStart += Array.isArray(groups[s].doctors) ? groups[s].doctors.length : 1;
          }
          return nextStart < totalCards ? nextStart : prev;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveCardIndex((prev) => {
          const current = indexMap[prev];
          if (!current || current.sectionIndex === 0) return prev;
          const prevSectionLen = Array.isArray(groups[current.sectionIndex - 1].doctors) ? groups[current.sectionIndex - 1].doctors.length : 1;
          const sameRowPrev = prev - prevSectionLen;
          if (sameRowPrev >= 0) return sameRowPrev;
          let prevStart = 0;
          for (let s = 0; s < current.sectionIndex - 1; s++) {
            prevStart += Array.isArray(groups[s].doctors) ? groups[s].doctors.length : 1;
          }
          return prevStart;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalCards, indexMap, groups]);

  let cardCounter = 0;

  return (
    <div className="bg-[#F0F4F2] min-h-screen p-4 flex" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-[#2F3E46]">فهرست روانشناسان</h1>
          <p className="text-sm text-[#84A98C] mt-1">مدیریت و مشاهده برنامه روانشناسان کلینیک</p>
        </div>

        <div className="px-6 pb-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-[#FAFCFB] border border-[#E2E8E4] rounded-lg px-3 py-2 w-64 focus-within:border-[#52796F] focus-within:ring-1 focus-within:ring-[#52796F] transition-all flex-row-reverse">
            <span className="text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="جستجوی روانشناس..."
              className="flex-1 bg-transparent text-[#2F3E46] text-sm placeholder:text-[#84A98C] focus:outline-none text-right"
              dir="rtl"
            />
          </div>

          <select
            value={selectedSpecialtyId}
            onChange={(e) => dispatch(setSelectedSpecialtyId(e.target.value))}
            className="bg-[#FAFCFB] border border-[#E2E8E4] rounded-lg px-3 py-2 text-[#2F3E46] font-bold text-sm focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F] focus:outline-none transition-all cursor-pointer text-right"
            dir="rtl"
          >
            <option value={""}>همه تخصص‌ها</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>

          {/* <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#FAFCFB] border border-[#E2E8E4] rounded-lg px-3 py-2 text-[#2F3E46] font-bold text-sm focus:border-[#52796F] focus:ring-1 focus:ring-[#52796F] focus:outline-none transition-all cursor-pointer text-right"
            dir="rtl"
          >
            <option>وضعیت: فعال</option>
            <option>وضعیت: مرخصی</option>
            <option>وضعیت: همه</option>
          </select> */}
        </div>

        <div className="border-t border-[#E2E8E4]" />

        <div ref={containerRef} className="flex-1 overflow-y-auto">
          {status === "loading" ? (
            <div className="p-6 text-center text-[#84A98C]">در حال بارگذاری...</div>
          ) : (
            <div className="p-6 flex flex-col gap-10">
              {groups
                .filter((g) => (selectedSpecialtyId ? g.id === selectedSpecialtyId : true))
                .map((section) => {
                  const sectionStartIndex = cardCounter;
                  cardCounter += Array.isArray(section.doctors) ? section.doctors.length : 1;
                  return (
                    <SpecialtySection
                      key={section.id}
                      section={section}
                      activeIndex={activeCardIndex}
                      sectionStartIndex={sectionStartIndex}
                      onCardClick={setActiveCardIndex}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
