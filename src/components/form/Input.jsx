export default function Input({ label, message }) {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          id="outlined_success"
          aria-describedby="outlined_error_help"
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-dark-gray bg-transparent rounded-lg border appearance-none focus:outline-none peer ${message ? "border-red" : "border-stroke"}`}
          placeholder=" "
        />
        <label
          htmlFor="outlined_success"
          className={`absolute text-sm bg-white ${message ? "text-red" : "text-dark-gray"} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1`}
        >
          {label}
        </label>
      </div>
      {message && (
        <p id="outlined_error_help" className="mt-2 text-xs text-red">
          <span className="font-light">{message}</span>
        </p>
      )}
    </>
  );
}
