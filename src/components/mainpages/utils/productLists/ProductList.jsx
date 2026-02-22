import BtnRender from "./buttons/BtnRender";

function ProductList({ product, onDelete }) {
  // return (
  //   <div className="product-card">
  //     <div className="product-image">
  //       <img src={product.images?.url || "/no-image.png"} alt={product.title} />
  //     </div>

  //     <div className="product-info">
  //       <h2 title={product.title}>{product.title}</h2>
  //       <span className="price">₹{product.price}</span>
  //       <p className="description">{product.description}</p>
  //     </div>

  //     <div className="product-actions">
  //       <BtnRender product={product} onDelete={onDelete} />
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* IMAGE */}
      <div className="relative bg-slate-100 overflow-hidden">
        <img
          src={product.images?.url || "/no-image.png"}
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col flex-1">
        <h2
          className="text-lg font-semibold text-slate-900 line-clamp-1"
          title={product.title}
        >
          {product.title}
        </h2>

        <span className="text-indigo-600 font-bold text-xl mt-2">
          ₹{product.price}
        </span>

        <p className="text-slate-600 text-sm mt-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* ACTIONS */}
        <div className="mt-5">
          <BtnRender product={product} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
