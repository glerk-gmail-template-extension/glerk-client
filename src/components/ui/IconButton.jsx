export default function IconButton({ children }) {
  return (
    <button className="flex items-center justify-center w-8 h-8 ml-6 rounded-full hover:bg-gray-100">
      {children}
    </button>
  );
}
