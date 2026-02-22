import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import ProductList from "../productLists/ProductList";
import Pagination from "../../../pagination/Pagination";

function CategoryPage() {
  const { id } = useParams();
  const state = useContext(GlobalState);

  const [products] = state.productAPI.products;
  const [, setCategory] = state.productAPI.category;
  const [page, setPage] = state.productAPI.page;
  const [total] = state.productAPI.total;
  const [isAdmin] = state.userAPI.isAdmin;

  useEffect(() => {
    setCategory(id);
    setPage(1);

    return () => {
      setCategory("");
    };
  }, [id, setCategory, setPage]);

  // return (
  //   <div className="category-page-container">
  //     <h2 className="category-title">Categories Products</h2>

  //     <div className="products-grid">
  //       {products.length === 0 ? (
  //         <p className="no-products">No products found in this category.</p>
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

  //     <div className="pagination-wrapper">
  //       <Pagination page={page} setPage={setPage} total={total} />
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Category Products
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore products from this category
          </p>
        </div>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-lg">
              No products found in this category.
            </p>
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
          <Pagination page={page} setPage={setPage} total={total} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
