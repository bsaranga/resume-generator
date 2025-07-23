export default function Layout({ children }) {
  return (
    <div style={{ width: '595px', height: '842px'}} className={process.env.NODE_ENV == 'development' ? "border border-red-500" : ""}>
      <div className="px-8 py-4 max-w-full prose prose-h1:text-[1.5rem] prose-h1:mb-0 prose-img:mt-0 prose-img:mb-0 prose-h2:mt-2 prose-h2:mb-2 prose-h2:font-[600] prose-h2:text-[0.78rem] prose-h3:mt-0 prose-h3:mb-0 prose-h3:text-[0.70rem] prose-h3:font-[600] prose-h3:text-slate-700 prose-li:mt-1 prose-li:mb-1 prose-li:text-[0.7rem] prose-hr:mt-3 prose-hr:mb-3 prose-p:mb-1 prose-p:text-[0.72rem] prose-p:leading-[1.2] prose-li:*:mb-0 prose-li:*:mt-0 prose-a:text-blue-600 prose-ul:mt-2 prose-ul:mb-2">
        {children}
      </div>
    </div>
  );
}