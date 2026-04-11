export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const base = "px-8 py-4 rounded-3xl font-semibold transition-all active:scale-95";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "border border-white/30 hover:border-white text-white",
    outline: "border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}