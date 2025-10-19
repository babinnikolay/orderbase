export default function Table({ head, foot, children }) {
  return (
    <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800">
      <table className="w-full border-collapse mt-2.5">
        <thead>
          <tr className="text-left border-b border-primary-700">
            {head.map((th, index) =>
              index === head.length - 1 ? (
                <th className="text-center w-1" key={index}>
                  {th}
                </th>
              ) : (
                <th className="text-left" key={index}>
                  {th}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
        <tfoot className="h-8">
          {foot ? (
            <tr>
              <td></td>
              <td className="text-right pt-2 px-2">Итого:</td>
              <td className="text-left pt-2 ">{foot.amount}</td>
            </tr>
          ) : null}
        </tfoot>
      </table>
    </div>
  );
}
