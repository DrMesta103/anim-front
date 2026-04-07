export default function TableSkeleton({ rowCount, columnCount }: { rowCount: number; columnCount: number }) {
  return (
    <>
      {Array(rowCount)
        .fill(0)
        .map((_, index) => (
          <tr key={index}>
            {Array(columnCount)
              .fill(0)
              .map((_, i) => (
                <td className="px-8 py-5" key={i}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
}
