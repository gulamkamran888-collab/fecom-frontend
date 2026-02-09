import "./Pagination.css";

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

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={i} className="dots">
            …
          </span>
        ) : (
          <button
            key={i}
            className={page === p ? "active" : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ),
      )}

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
