const specialties: Specialty[] = [
  {
    id: 1,
    title: "Cardiology",
    description: "Heart and vascular health",
    specialtyCode: "CARD-001",
  },
  {
    id: 2,
    title: "Neurology",
    description: "Disorders of the nervous system",
    specialtyCode: "NEURO-002",
  },
  {
    id: 3,
    title: "Orthopedics",
    description: "Musculoskeletal system care",
    specialtyCode: "ORTHO-003",
  },
  {
    id: 4,
    title: "Pediatrics",
    description: "Child health and development",
    specialtyCode: "PEDI-004",
  },
];

export default function Specialties() {
  return (
    <div className="p-6">
      {/* {/ Action Bar /} */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-[400px] px-6 py-3 rounded-[15px] border border-accent bg-white shadow-sm 
                     text-text placeholder:text-gray-300 focus:border-primary focus:outline-none 
                     transition-all duration-200 text-sm"
        />
        <button
          className="flex justify-center items-center  truncate px-6 py-3 bg-primary text-white rounded-[8px] text-sm font-bold 
                           hover:bg-primary/90 transition-colors shadow-sm"
        >
          + Add
        </button>
      </div>

      {/* {/ Page Title /} */}
      <h2 className="text-lg font-bold text-text mb-6">All Specialties</h2>

      {/* {/ Table Container /} */}
      <div className="rounded-[30px] bg-white shadow-[0_10px_30px_rgba(47,62,70,0.05)] border border-accent/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F4F2]">
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">ID</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">Title</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">Description</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-right">Specialty Code</th>
              <th className="text-xs font-bold text-secondary px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {specialties.map((specialty) => (
              <tr key={specialty.id} className="hover:bg-[#F0F4F2]/50 transition-colors">
                <td className="text-sm text-text px-8 py-5 text-right">{specialty.id}</td>
                <td className="text-sm font-semibold text-text px-8 py-5 truncate text-right">{specialty.title}</td>
                <td className="text-sm text-secondary px-8 py-5 text-right truncate">{specialty.description}</td>
                <td className="text-sm font-semibold text-primary px-8 py-5 truncate text-right">{specialty.specialtyCode}</td>
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

      {/* {/* Empty State (if needed) /} */}
      {specialties.length === 0 && (
        <div className="text-center py-12 text-secondary">
          <p>No specialties found.</p>
        </div>
      )}
    </div>
  );
}
