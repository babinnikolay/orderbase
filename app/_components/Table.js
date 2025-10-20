export default function Table({ head, foot, gridCols, children }) {
  return (
    <div className="w-full border-collapse mt-2.5">
      <div>
        <div
          className={`w-full py-2 grid grid-cols-${gridCols} text-left border-b border-primary-700`}
        >
          {head.map(
            (th, index) => (
              // index === head.length - 1 ? (
              //   <div className="text-center" key={index}>
              //     {th}
              //   </div>
              // ) : (
              <div className="text-left" key={index}>
                {th}
              </div>
            ),
            // ),
          )}
        </div>
      </div>
      <div>{children}</div>
      {/*<tfoot className="h-8">*/}
      {/*  {foot ? (*/}
      {/*    <tr>*/}
      {/*      <td></td>*/}
      {/*      <td className="text-right pt-2 px-2">Итого:</td>*/}
      {/*      <td className="text-left pt-2 ">{foot.amount}</td>*/}
      {/*      <td></td>*/}
      {/*    </tr>*/}
      {/*  ) : null}*/}
      {/*</tfoot>*/}
    </div>
  );
}
