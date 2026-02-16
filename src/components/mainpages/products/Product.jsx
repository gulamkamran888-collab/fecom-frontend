// import { useContext } from "react";
// import GlobalState from "../../../GlobalState";
// import "./Product.css";
// import ProductList from "../utils/productLists/ProductList";
// import HomeSlider from "../utils/slider/HomeSlider";
// import CategoryBar from "../utils/categories/CategoryBar";
// import Pagination from "../../pagination/Pagination";
// import { useEffect } from "react";

// function Product() {
//   const state = useContext(GlobalState);
//   const [isAdmin] = state.userAPI.isAdmin;
//   const [products] = state.productAPI.products;
//   const [, setSort] = state.productAPI.sort;
//   const [page, setPage] = state.productAPI.page;
//   const [total] = state.productAPI.total;
//   const [, setCategory] = state.productAPI.category;

//   if (!products) return <h2>Loading...</h2>;

//   useEffect(() => {
//     setCategory(""); // 🔥 RESET CATEGORY
//     setPage(1); // pagination bhi reset
//   }, []);

//   return (
//     <div className="products-page">
//       {!isAdmin && (
//         <>
//           <HomeSlider />
//           <CategoryBar />
//         </>
//       )}

//       {/* 🔠 SORT */}
//       <div className="sort-bar">
//         <select onChange={(e) => setSort(e.target.value)}>
//           <option value="">Latest</option>
//           <option value="title">A → Z</option>
//           <option value="-title">Z → A</option>
//         </select>
//       </div>

//       {/* 🛍️ PRODUCTS GRID */}
//       <div className="products">
//         {products.length === 0 && <p>No products found</p>}
//         {products.map((product) => (
//           <ProductList key={product._id} product={product} isAdmin={isAdmin} />
//         ))}
//       </div>

//       {/* 📄 PAGINATION (OUTSIDE GRID) */}
//       <Pagination page={page} setPage={setPage} total={total} limit={6} />
//     </div>
//   );
// }

// export default Product;

import { useContext, useEffect } from "react";
import GlobalState from "../../../GlobalState";
import ProductList from "../utils/productLists/ProductList";
import HomeSlider from "../utils/slider/HomeSlider";
import CategoryBar from "../utils/categories/CategoryBar";
import Pagination from "../../pagination/Pagination";
import "./Product.css";

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

  return (
    <div className="products-page">
      {!isAdmin && (
        <>
          <HomeSlider />
          <CategoryBar />
        </>
      )}

      {/* SORT BAR */}
      <div className="sort-bar">
        <label htmlFor="sort-select">Sort By:</label>
        <select id="sort-select" onChange={(e) => setSort(e.target.value)}>
          <option value="">Latest</option>
          <option value="title">A → Z</option>
          <option value="-title">Z → A</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          products.map((product) => (
            <ProductList
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}
      <Pagination page={page} setPage={setPage} total={total} limit={6} />
    </div>
  );
}

export default Product;
