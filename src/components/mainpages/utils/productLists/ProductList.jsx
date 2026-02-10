import "./ProductList.css";
import BtnRender from "./BtnRender";

function ProductList({ product, onDelete }) {
  return (
    <div className="product-card">
      {/* <img src={product.images.url} alt={product.title} /> */}
      <img src={product.images?.url || "/no-image.png"} alt={product.title} />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>₹{product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} />
    </div>
  );
}

export default ProductList;
