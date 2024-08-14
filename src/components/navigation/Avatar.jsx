import defaultProfile from "../../assets/images/profile.png";

export default function Avatar({ profileUrl = defaultProfile }) {
  const handleLoadImageError = (error) => {
    error.target.onerror = null;
    error.target.src = defaultProfile;
  };

  return (
    <div className="flex items-center justify-center w-10 h-10">
      <img
        src={profileUrl}
        alt="profile"
        className="rounded-full"
        onError={handleLoadImageError}
      />
    </div>
  );
}
