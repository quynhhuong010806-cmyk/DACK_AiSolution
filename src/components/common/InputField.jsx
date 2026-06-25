export default function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />
    </div>
  );
}
