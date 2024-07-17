export default function Avatar({ initial }) {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-800">
      <p className="text-lg text-white select-none">{initial}</p>
    </div>
  );
}
