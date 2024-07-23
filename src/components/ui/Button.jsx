export default function Button({
  type = "button",
  text,
  textColor = "text-dark-gray",
  borderColor = "border-stroke",
  backgroundColor = "bg-white",
  hoverBackgroundColor = "hover:bg-gray-50",
  onClick = () => {},
  children: Icon,
}) {
  const buttonStyle = `${textColor} ${borderColor} ${backgroundColor} ${hoverBackgroundColor}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex border ${buttonStyle} font-medium rounded-2xl text-sm px-5 py-2.5 h-10`}
    >
      {Icon && <div className="flex items-center h-5 mr-1.5">{Icon}</div>}
      <div>{text}</div>
    </button>
  );
}
