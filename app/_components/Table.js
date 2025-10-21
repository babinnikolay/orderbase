export default function Table({ children }) {
  return (
    <div className="m-4 px-4 py-2 rounded-xl border border-primary-600 shadow-lg bg-primary-800">
      <div className="w-full border-collapse mt-2.5">{children}</div>
    </div>
  );
}
