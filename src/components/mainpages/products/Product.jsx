import { useContext, useEffect } from "react";
import GlobalState from "../../../GlobalState";
import ProductList from "../utils/productLists/ProductList";
import HomeSlider from "../utils/slider/HomeSlider";
import CategoryBar from "../utils/categories/CategoryBar";
import Pagination from "../../pagination/Pagination";

function Product() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [products] = state.productAPI.products;
  const [, setSort] = state.productAPI.sort;
  const [page, setPage] = state.productAPI.page;
  const [total] = state.productAPI.total;
  const [, setCategory] = state.productAPI.category;

  if (!products) return <h2 className="loading">Loading...</h2>;

  useEffect(() => {
    setCategory(""); // reset category
    setPage(1); // reset pagination
  }, []);

  // return (
  //   <div className="products-page">
  //     {!isAdmin && (
  //       <>
  //         <HomeSlider />
  //         <CategoryBar />
  //       </>
  //     )}

  //     {/* SORT BAR */}
  //     <div className="sort-bar">
  //       <label htmlFor="sort-select">Sort By:</label>
  //       <select id="sort-select" onChange={(e) => setSort(e.target.value)}>
  //         <option value="">Latest</option>
  //         <option value="title">A → Z</option>
  //         <option value="-title">Z → A</option>
  //       </select>
  //     </div>

  //     {/* PRODUCTS GRID */}
  //     <div className="products-grid">
  //       {products.length === 0 ? (
  //         <p className="no-products">No products found</p>
  //       ) : (
  //         products.map((product) => (
  //           <ProductList
  //             key={product._id}
  //             product={product}
  //             isAdmin={isAdmin}
  //           />
  //         ))
  //       )}
  //     </div>

  //     {/* PAGINATION */}
  //     <Pagination page={page} setPage={setPage} total={total} limit={6} />
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO + CATEGORY */}
      {!isAdmin && (
        <div className="mb-8">
          <HomeSlider />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <CategoryBar />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SORT BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Explore Products
          </h2>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-select"
              className="text-sm font-medium text-slate-600"
            >
              Sort By:
            </label>

            <select
              id="sort-select"
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="">Latest</option>
              <option value="title">A → Z</option>
              <option value="-title">Z → A</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <p className="text-slate-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductList
                key={product._id}
                product={product}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-12 flex justify-center">
          <Pagination page={page} setPage={setPage} total={total} limit={6} />
        </div>
      </div>
    </div>
  );
}

export default Product;
