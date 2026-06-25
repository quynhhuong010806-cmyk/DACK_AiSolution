export default function Button({
  children,
  variant = "primary",
  type = "button",
  ...props
}) {
  const baseStyle =
    "px-5 py-3 rounded-lg font-medium transition duration-200";

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
