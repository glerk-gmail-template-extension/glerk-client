import ErrorImage from "../../assets/images/404.png";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center">
      <img src={ErrorImage} alt="404 error page" className="mt-20 w-200" />
    </div>
  );
}
