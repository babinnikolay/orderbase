export default function Table({ children }) {
  return (
    <div className="m-4 p-4 rounded-xl border border-primary-600 shadow-lg bg-primary-800">
      <table className="w-full border-collapse mt-2.5">
        <thead>
          <tr className="text-left border-b border-primary-700">
            <th className="p-2">Date</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
        <tfoot>
          <tr className="">
            <td></td>
            <td className="text-right pt-2 px-2">Итого:</td>
            <td className="text-left pt-2 ">$1250</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
