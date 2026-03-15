import { Room } from "../types";

const rooms: Room[] = [
  { id: 1, name: "Consultation A", description: "Main consultation room", floor: 0, isActive: true },
  { id: 2, name: "Consultation B", description: "General consultation room", floor: 0, isActive: true },
  { id: 3, name: "Emergency Room 1", description: "First aid and emergency care", floor: 1, isActive: false },
  { id: 4, name: "Pediatrics", description: "Child examination room", floor: 2, isActive: true },
];

export default function Rooms() {
  const getStatusColor = (isActive: Room["isActive"]) => (isActive ? "bg-primary text-white" : "bg-gray-200 text-gray-600");

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm text-text placeholder:text-gray-300 focus:border-primary focus:outline-none transition-all duration-200 text-sm"
        />
        <button className="flex justify-center truncate items-center px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
          + Add
        </button>
      </div>

      <h2 className="text-lg font-bold text-text mb-6">All Rooms</h2>

      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] overflow-x-auto border border-accent/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ID</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">Room Name</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">Description</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">Floor</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">Status</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-[#F0F4F2]/50 transition-colors">
                <td className="text-sm text-text px-8 py-5 text-right">{room.id}</td>
                <td className="text-sm font-semibold text-text px-8 py-5 text-right truncate">{room.name}</td>
                <td className="text-sm text-secondary px-8 py-5 text-right truncate">{room.description}</td>
                <td className="text-sm font-semibold text-primary px-8 py-5 text-center">{room.floor}</td>
                <td className="px-8 py-5 text-center">
                  <div
                    className={`inline-block w-20 text-center py-1.5 rounded-[12px] text-xs font-bold ${
                      room.isActive ? "bg-primary text-white" : "bg-[#2F3E46] text-white"
                    }`}
                  >
                    {room.isActive ? "Active" : "Deactive"}
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button className="text-primary hover:text-text transition-colors p-1.5 rounded-lg hover:bg-accent/20" title="Edit">
                      ✏️
                    </button>
                    <button className="text-primary hover:text-error transition-colors p-1.5 rounded-lg hover:bg-error/10" title="Delete">
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
          <p>No rooms found.</p>
        </div>
      )}
    </div>
  );
}
