const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-stone-100 text-stone-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    up: 'bg-red-100 text-red-700',
    down: 'bg-emerald-100 text-emerald-700',
    stable: 'bg-stone-100 text-stone-700',
    Weather: 'bg-sky-100 text-sky-700',
    'Supply Chain': 'bg-amber-100 text-amber-700',
    Disease: 'bg-red-100 text-red-700',
    Labor: 'bg-purple-100 text-purple-700',
    Trade: 'bg-blue-100 text-blue-700',
    Economic: 'bg-emerald-100 text-emerald-700',
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-emerald-100 text-emerald-700',
  };

  const baseClasses = 'px-2 py-1 rounded-md text-xs font-medium';
  const variantClasses = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
