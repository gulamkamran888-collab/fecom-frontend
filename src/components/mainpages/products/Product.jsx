import { useContext } from "react";
import GlobalState from "../../../GlobalState";
import "./Product.css";
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

  if (!products) return <h2>Loading...</h2>;

  return (
    <div className="products-page">
      {!isAdmin && (
        <>
          <HomeSlider />
          <CategoryBar />
        </>
      )}

      {/* 🔠 SORT */}
      <div className="sort-bar">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Latest</option>
          <option value="title">A → Z</option>
          <option value="-title">Z → A</option>
        </select>
      </div>

      {/* 🛍️ PRODUCTS GRID */}
      <div className="products">
        {products.length === 0 && <p>No products found</p>}
        {products.map((product) => (
          <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>

      {/* 📄 PAGINATION (OUTSIDE GRID) */}
      <Pagination page={page} setPage={setPage} total={total} limit={6} />
    </div>
  );
}

export default Product;
