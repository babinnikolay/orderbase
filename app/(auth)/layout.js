export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary-950 text-primary-100 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
