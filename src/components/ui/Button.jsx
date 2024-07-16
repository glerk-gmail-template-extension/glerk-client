import PropTypes from "prop-types";

export default function Button({
  text,
  textColor,
  borderColor,
  backgroundColor,
  hoverBackgroundColor,
  children: Icon,
}) {
  const buttonStyle = `${textColor} ${borderColor} ${backgroundColor} ${hoverBackgroundColor}`;

  return (
    <button
      type="button"
      className={`flex border ${buttonStyle} font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2`}
    >
      <div className="self-center mr-1">{Icon}</div>
      <div>{text}</div>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  hoverBackgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node,
};
