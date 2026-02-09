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

  // 🔥 set category from URL
  useEffect(() => {
    setCategory(id);
    setPage(1);
  }, [id]);

  return (
    <div className="category-page">
      <h2>Category Products</h2>

      <div className="products">
        {products.map((product) => (
          <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
}

export default CategoryPage;
