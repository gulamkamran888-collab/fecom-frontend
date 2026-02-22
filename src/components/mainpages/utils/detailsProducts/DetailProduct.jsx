import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import publicApi from "../../../../api/publicApi";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicApi.get(`/api/products/${id}`);
        setDetailProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!detailProduct) return <h2 className="loading">Product not found</h2>;

  // return (
  //   <div className="detail-container">
  //     <div className="detail-card">
  //       <div className="detail-image">
  //         <img
  //           src={detailProduct.images?.url || "/no-image.png"}
  //           alt={detailProduct.title}
  //         />
  //       </div>

  //       <div className="detail-info">
  //         <h2>{detailProduct.title}</h2>
  //         <span className="product-id">SKU: {detailProduct.product_id}</span>

  //         <div className="price">₹{detailProduct.price}</div>

  //         <p className="description">{detailProduct.description}</p>
  //         <p className="content">{detailProduct.content}</p>
  //         <p className="sold">Sold: {detailProduct.sold}</p>

  //         <button
  //           className="buy-btn"
  //           onClick={() => {
  //             addCart(detailProduct);
  //             navigate("/cart");
  //           }}
  //         >
  //           Buy Now
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
          {/* PRODUCT IMAGE */}
          <div className="flex items-center justify-center bg-slate-100 rounded-2xl p-6">
            <img
              src={detailProduct.images?.url || "/no-image.png"}
              alt={detailProduct.title}
              className="max-h-[450px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                {detailProduct.title}
              </h2>

              <p className="text-sm text-slate-500 mb-4">
                SKU: {detailProduct.product_id}
              </p>

              <div className="text-2xl font-bold text-indigo-600 mb-6">
                ₹{detailProduct.price}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                {detailProduct.description}
              </p>

              <p className="text-slate-500 text-sm mb-4">
                {detailProduct.content}
              </p>

              <p className="text-sm text-slate-500">
                Sold: {detailProduct.sold}
              </p>
            </div>

            {/* BUTTON */}
            <div className="pt-6">
              <button
                onClick={() => {
                  addCart(detailProduct);
                  navigate("/cart");
                }}
                className="w-full py-4 rounded-xl bg-slate-900 text-white font-medium text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
