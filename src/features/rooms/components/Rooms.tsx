import { AppDispatch, RootState } from "@/store";
import { Room } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllRoomsThunk } from "../hooks";
import { setSearch, setMode, setName, setDescription, setFloor, setIsActive, refreshData, refreshState } from "../roomSlice";
import { formatFaPrice } from "@/shared/lib/formatFaPrice";
import { initialMode } from "@/shared/constants/mode.constant";
import RoomsModal from "./RoomsModal";
import RoomsDeleteAlert from "./RoomsDeleteAlert";

export default function Rooms() {
  const dispatch: AppDispatch = useDispatch();
  const { rooms, search } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    dispatch(fetchAllRoomsThunk());

    return () => {
      dispatch(refreshState());
    };
  }, []);

  const handleOpenAdd = () => {
    dispatch(refreshData());
    dispatch(setMode({ ...initialMode, method: "CREATE" }));
  };

  const handleOpenEdit = (room: Room) => {
    dispatch(refreshData());
    dispatch(setMode({ id: room.id.toString(), method: "UPDATE", title: room.name }));
    dispatch(setName(room.name));
    dispatch(setDescription(room.description));
    dispatch(setFloor(room.floor));
    dispatch(setIsActive(room.isActive));
  };

  const handleDeleteAlertOpen = (room: Room) => {
    dispatch(setMode({ id: room.id.toString(), method: "DELETE", title: room.name }));
  };

  return (
    <div className="p-6">
      <RoomsDeleteAlert />
      <RoomsModal />

      <div className="flex items-center gap-4 mb-8">
        <input
          value={search}
          onChange={({ target }) => dispatch(setSearch(target.value))}
          placeholder="جستجو..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm text-text placeholder:text-gray-300 focus:border-primary focus:outline-none transition-all duration-200 text-sm"
        />
        <button
          onClick={handleOpenAdd}
          className="flex justify-center truncate items-center px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          افزودن +
        </button>
      </div>

      <h2 className="text-lg font-bold text-text mb-6">تمام اتاق ها</h2>

      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] overflow-x-auto border border-accent/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ردیف</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">نام</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">توضیحات</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">طبقه</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">وضعیت</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {rooms
              .filter(
                (room) =>
                  room.name.includes(search.toLowerCase()) ||
                  `${room.isActive ? "فعال" : "غیر فعال"}`.startsWith(search) ||
                  `${room.floor === 0 ? "همکف" : room.floor.toString()}`.startsWith(search),
              )
              .map((room, index) => (
                <tr key={room.id} className="hover:bg-[#F0F4F2]/50 transition-colors">
                  <td className="text-sm text-text px-8 py-5 text-right">{formatFaPrice(index + 1)}</td>
                  <td className="text-sm font-semibold text-text px-8 py-5 text-right truncate">{room.name}</td>
                  <td className="text-sm text-secondary px-8 py-5 text-right truncate">{room.description}</td>
                  <td className="text-sm font-semibold text-primary px-8 py-5 text-center">
                    {room.floor === 0 ? "همکف" : formatFaPrice(room.floor)}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div
                      className={`inline-block w-20 text-center py-1.5 rounded-[12px] text-xs font-bold ${
                        room.isActive ? "bg-primary text-white" : "bg-[#2F3E46] text-white"
                      }`}
                    >
                      {room.isActive ? "فعال" : "غیر فعال"}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(room)}
                        className="text-primary hover:text-text transition-colors p-1.5 rounded-lg hover:bg-accent/20"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteAlertOpen(room)}
                        className="text-primary hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/10"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>اتاقی پیدا نشد.</p>
        </div>
      )}
    </div>
  );
}
