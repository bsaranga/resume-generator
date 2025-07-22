export default function Layout({ children }) {
  return (
    <div style={{ width: '595px', height: '842px'}} className={process.env.NODE_ENV == 'development' ? "border border-red-500" : ""}>
        <div className="p-1">
            {children}
        </div>
    </div>
  );
}