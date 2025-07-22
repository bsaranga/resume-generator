export default function Layout({ children }) {
  return (
    <div style={{ width: '595px', height: '842px'}} className={process.env.NODE_ENV == 'development' ? "border border-red-500" : ""}>
      <div className="px-8 py-4 max-w-full prose prose-img:mt-0 prose-img:mb-0 prose-h2:mt-2 prose-h2:mb-2 prose-h2:font-[500] prose-h2:text-[0.75rem] prose-h3:mt-1 prose-h3:mb-1 prose-h3:text-[0.70rem] prose-h3:font-[500] prose-li:text-[0.7rem] prose-hr:mt-1 prose-hr:mb-1 prose-p:mb-1 prose-p:text-[0.72rem] prose-p:leading-[1.2] prose-a:text-blue-600">
        {children}
      </div>
    </div>
  );
}