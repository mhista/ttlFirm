const NumbersContainer = ({ children, className = "" }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>{children}</div>
);
export default NumbersContainer;
