export default function ContentWrapper({ children }) {
  return (
    <div className="box-border relative bg-white rounded-3xl w-140">
      {children}
    </div>
  );
}
