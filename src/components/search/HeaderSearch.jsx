import { useContext } from "react";
import GlobalState from "../../GlobalState";

function HeaderSearch() {
  const state = useContext(GlobalState);
  const [, setSearch] = state.productAPI.search;
  const [, setPage] = state.productAPI.page;

  // return (
  //   <input
  //     className="header-search"
  //     type="text"
  //     placeholder="Search products..."
  //     onChange={(e) => {
  //       setSearch(e.target.value);
  //       setPage(1);
  //     }}
  //   />
  // );

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 bg-white
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:border-indigo-500 transition-all duration-300 text-sm"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
    </div>
  );
}

export default HeaderSearch;
