export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"

  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
