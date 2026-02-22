function Pagination({ page, setPage, total = 0, limit = 6 }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;

    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);

    if (left > 1) pages.push(1);
    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");
    if (right < totalPages) pages.push(totalPages);

    return pages;
  };

  // return (
  //   <div className="pagination">
  //     <button disabled={page === 1} onClick={() => setPage(page - 1)}>
  //       Prev
  //     </button>

  //     {getPages().map((p, i) =>
  //       p === "..." ? (
  //         <span key={i} className="dots">
  //           …
  //         </span>
  //       ) : (
  //         <button
  //           key={i}
  //           className={page === p ? "active" : ""}
  //           onClick={() => setPage(p)}
  //         >
  //           {p}
  //         </button>
  //       ),
  //     )}

  //     <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
  //       Next
  //     </button>
  //   </div>
  // );

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      {/* PREV */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          page === 1
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
        }`}
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-3 py-2 text-slate-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={i}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              page === p
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          page === totalPages
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
