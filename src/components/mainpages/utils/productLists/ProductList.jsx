// import "./ProductList.css";
// import BtnRender from "./BtnRender";

// function ProductList({ product, onDelete }) {
//   return (
//     <div className="product-card">
//       <img src={product.images?.url || "/no-image.png"} alt={product.title} />
//       <div className="product_box">
//         <h2 title={product.title}>{product.title}</h2>
//         <span>₹{product.price}</span>
//         <p>{product.description}</p>
//       </div>

//       <BtnRender product={product} />
//     </div>
//   );
// }

// export default ProductList;

import "./ProductList.css";
import BtnRender from "./buttons/BtnRender";

function ProductList({ product, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images?.url || "/no-image.png"} alt={product.title} />
      </div>

      <div className="product-info">
        <h2 title={product.title}>{product.title}</h2>
        <span className="price">₹{product.price}</span>
        <p className="description">{product.description}</p>
      </div>

      <div className="product-actions">
        <BtnRender product={product} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default ProductList;
