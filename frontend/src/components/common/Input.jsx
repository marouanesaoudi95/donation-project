export default function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-purple-300 text-sm font-medium">{label}</label>}
      <input
        {...props}
        className="w-full bg-zinc-900 border border-purple-900 focus:border-purple-400 rounded-3xl px-6 py-5 text-lg outline-none transition-all"
      />
    </div>
  );
}