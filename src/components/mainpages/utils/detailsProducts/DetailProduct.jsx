// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import GlobalState from "../../../../GlobalState";
// import publicApi from "../../../../api/publicApi";

// function DetailProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const state = useContext(GlobalState);
//   const addCart = state.userAPI.addCart;

//   const [detailProduct, setDetailProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const res = await publicApi.get(`/api/products/${id}`);
//         setDetailProduct(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProduct();
//   }, [id]);

//   if (loading) return <h2 className="loading">Loading...</h2>;
//   if (!detailProduct) return <h2 className="loading">Product not found</h2>;

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
//           {/* PRODUCT IMAGE */}
//           <div className="flex items-center justify-center bg-slate-100 rounded-2xl p-6">
//             <img
//               src={detailProduct.images?.url || "/no-image.png"}
//               alt={detailProduct.title}
//               className="max-h-[450px] object-contain transition-transform duration-500 hover:scale-105"
//             />
//           </div>

//           {/* PRODUCT INFO */}
//           <div className="flex flex-col justify-between space-y-6">
//             <div>
//               <h2 className="text-3xl font-semibold text-slate-900 mb-3">
//                 {detailProduct.title}
//               </h2>

//               <p className="text-sm text-slate-500 mb-4">
//                 SKU: {detailProduct.product_id}
//               </p>

//               <div className="text-2xl font-bold text-indigo-600 mb-6">
//                 ₹{detailProduct.price}
//               </div>

//               <p className="text-slate-600 leading-relaxed mb-4">
//                 {detailProduct.description}
//               </p>

//               <p className="text-slate-500 text-sm mb-4">
//                 {detailProduct.content}
//               </p>

//               <p className="text-sm text-slate-500">
//                 Sold: {detailProduct.sold}
//               </p>
//             </div>

//             {/* BUTTON */}
//             <div className="pt-6">
//               <button
//                 onClick={() => {
//                   addCart(detailProduct);
//                   navigate("/cart");
//                 }}
//                 className="w-full py-4 rounded-xl bg-slate-900 text-white font-medium text-lg hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DetailProduct;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import publicApi from "../../../../api/publicApi";

function DetailProduct({ id }) {
  // const { id } = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
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

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!detailProduct) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <h2 className="text-xl text-slate-700">Product not found</h2>
      </div>
    );
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={() => navigate(-1)}
    >
      {/* MODAL */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 animate-[fadeIn_.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-500 hover:text-red-500 text-xl sm:text-2xl font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 p-5 sm:p-8">
          {/* IMAGE */}
          <div className="flex items-center justify-center bg-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <img
              src={detailProduct.images?.url || "/no-image.png"}
              alt={detailProduct.title}
              className="max-h-[250px] sm:max-h-[350px] lg:max-h-[450px] w-full object-contain"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 mb-2">
                {detailProduct.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                SKU: {detailProduct.product_id}
              </p>

              <div className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
                ₹{detailProduct.price}
              </div>

              <p className="text-sm sm:text-base text-slate-600 mb-3">
                {detailProduct.description}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                {detailProduct.content}
              </p>

              <p className="text-xs sm:text-sm text-slate-500">
                Sold: {detailProduct.sold}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => addCart(detailProduct)}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg sm:rounded-xl hover:bg-indigo-700 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full py-3 bg-slate-900 text-white rounded-lg sm:rounded-xl hover:bg-slate-700 transition"
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
