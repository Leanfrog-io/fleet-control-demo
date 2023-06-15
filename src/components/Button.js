const Button = ({ onClick, children, color }) => {
  let buttonClass = "";

  switch (color) {
    case "green":
      buttonClass =
        "w-full rounded-md bg-green-600 hover:bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none";
      break;
    case "red":
      buttonClass =
        "w-full rounded-md bg-red-600 hover:bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none";
      break;
    default:
      buttonClass =
        "w-full rounded-md bg-gray-600 hover:bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none";
      break;
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
