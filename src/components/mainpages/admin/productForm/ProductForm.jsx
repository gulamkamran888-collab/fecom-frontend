import React, { useContext, useEffect, useState } from "react";

import GlobalState from "../../../../GlobalState";
import authApi from "../../../../api/authApi";

const initialState = {
  product_id: "",
  title: "",
  price: "",
  description: "",
  content: "",
  category: "",
};

function ProductForm({ isEdit = false, productId = null }) {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const categoriesAPI = state.categoriesAPI;
  const categories = categoriesAPI?.categories?.[0] || [];

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD PRODUCT (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (isEdit && productId) {
      const fetchProduct = async () => {
        try {
          const res = await authApi.get(`/api/products/${productId}`);
          setProduct({
            product_id: res.data.product_id,
            title: res.data.title,
            price: res.data.price,
            description: res.data.description,
            content: res.data.content,
            category: res.data.category,
          });
          setImages(res.data.images);
        } catch (err) {
          alert("Failed to load product");
        }
      };
      fetchProduct();
    }
  }, [isEdit, productId]);

  /* =========================
        INPUT HANDLER
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  /* =========================
        IMAGE UPLOAD
  ========================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) return alert("Image size should be under 1MB");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await authApi.post(`/api/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.msg || "Image upload failed");
    }
  };

  /* =========================
        SUBMIT FORM
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images) return alert("Please upload product image");

    try {
      setLoading(true);

      if (isEdit) {
        await authApi.put(
          `/api/products/${productId}`,
          { ...product, images },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Product updated successfully");
      } else {
        await authApi.post(
          `/api/products`,
          { ...product, images },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Product created successfully");
        setProduct(initialState);
        setImages(null);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  // return (
  //   <form className="product-form" onSubmit={handleSubmit}>
  //     <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>

  //     <div className="product-form-grid">
  //       <div>
  //         <label>Product ID</label>
  //         <input
  //           name="product_id"
  //           value={product.product_id}
  //           onChange={handleChange}
  //           disabled={isEdit}
  //         />
  //       </div>

  //       <div>
  //         <label>Title</label>
  //         <input
  //           name="title"
  //           value={product.title}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label>Price</label>
  //         <input
  //           type="number"
  //           name="price"
  //           value={product.price}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label>Category</label>
  //         <select
  //           name="category"
  //           value={product.category}
  //           onChange={handleChange}
  //           required
  //         >
  //           <option value="">Select Category</option>
  //           {categories.map((c) => (
  //             <option value={c._id} key={c._id}>
  //               {c.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       <div className="full-width">
  //         <label>Description</label>
  //         <textarea
  //           name="description"
  //           value={product.description}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div className="full-width">
  //         <label>Content</label>
  //         <textarea
  //           name="content"
  //           value={product.content}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div className="full-width">
  //         <label>Product Image</label>
  //         <input
  //           type="file"
  //           accept="image/png, image/jpeg, image/webp"
  //           onChange={handleUpload}
  //         />

  //         {loading && <p>Uploading...</p>}

  //         {images && (
  //           <img
  //             src={images.url}
  //             alt="product"
  //             className="product-image-preview"
  //           />
  //         )}
  //       </div>
  //     </div>

  //     <div className="product-form-actions">
  //       <button
  //         type="button"
  //         className="btn-secondary"
  //         onClick={() => window.history.back()}
  //       >
  //         Cancel
  //       </button>

  //       <button type="submit" className="btn-primary" disabled={loading}>
  //         {isEdit ? "Update Product" : "Create Product"}
  //       </button>
  //     </div>
  //   </form>
  // );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8">
            {isEdit ? "Edit Product" : "Create Product"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* PRODUCT ID */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Product ID
              </label>
              <input
                name="product_id"
                value={product.product_id}
                onChange={handleChange}
                disabled={isEdit}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-100 text-sm sm:text-base"
              />
            </div>

            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Title
              </label>
              <input
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* CONTENT */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={product.content}
                onChange={handleChange}
                rows="4"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleUpload}
                className="mb-3 text-sm"
              />

              {loading && (
                <p className="text-sm text-indigo-600">Uploading image...</p>
              )}

              {images && (
                <div className="flex justify-center sm:justify-start">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 border rounded-xl overflow-hidden">
                    <img
                      src={images.url}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 active:scale-95
              ${
                isEdit
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              >
                {isEdit ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
