const Button = ({ children, ...restProps }) => (
  <button
    className="rounded shadow-button pl-6 pr-8 py-3 bg-white dark:bg-gray-600 dark:text-gray-200 border-2 border-gray-400 transition-colors hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75"
    {...restProps}
  >
    {children}
  </button>
);

export default Button;
