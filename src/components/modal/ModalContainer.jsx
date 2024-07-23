export default function ModalContainer({ children }) {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      {children}
    </div>
  );
}
