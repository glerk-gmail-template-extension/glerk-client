export default function Avatar({ profileUrl }) {
  return (
    <div className="flex items-center justify-center w-10 h-10">
      <img src={profileUrl} alt="profile" className="rounded-full" />
    </div>
  );
}
