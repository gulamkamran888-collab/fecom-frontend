import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import GlobalState from "../../../../GlobalState";
import authApi from "../../../../api/authApi";
import Pagination from "../../../pagination/Pagination";

function AdminProductList() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [page, setPage] = state.productAPI.page;
  const [total] = state.productAPI.total;
  const [products] = state.productAPI.products;

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await authApi.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  // return (
  //   <div className="admin-products">
  //     <div className="admin-products-header">
  //       <h2>All Products</h2>
  //       <Link to="/admin/create-product" className="btn-add">
  //         + Add Product
  //       </Link>
  //     </div>

  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Image</th>
  //           <th>Title</th>
  //           <th>Price</th>
  //           <th>Category</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {products
  //           .filter((p) => p.images && p.images.url)
  //           .map((p) => (
  //             <tr key={p._id}>
  //               <td>
  //                 {/* <img src={p.images.url} alt={p.title} /> */}
  //                 <img src={p.images?.url || "/no-image.png"} alt={p.title} />
  //               </td>
  //               <td>{p.title}</td>
  //               <td>₹{p.price}</td>
  //               <td>{p.category?.name || "—"}</td>
  //               <td className="actions">
  //                 <Link
  //                   to={`/admin/edit-product/${p._id}`}
  //                   className="btn-edit"
  //                 >
  //                   Edit
  //                 </Link>
  //                 <button
  //                   onClick={() => deleteProduct(p._id)}
  //                   className="btn-delete"
  //                 >
  //                   Delete
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //     <Pagination page={page} setPage={setPage} total={total} limit={6} />
  //   </div>
  // );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">All Products</h2>

        <Link
          to="/admin/create-product"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 active:scale-95"
        >
          + Add Product
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* HEAD */}
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-slate-200">
              {products
                .filter((p) => p.images && p.images.url)
                .map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={p.images?.url || "/no-image.png"}
                        alt={p.title}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-800">
                      {p.title}
                    </td>

                    <td className="px-6 py-4 text-indigo-600 font-semibold">
                      ₹{p.price}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {p.category?.name || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/edit-product/${p._id}`}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-8">
        <Pagination page={page} setPage={setPage} total={total} limit={6} />
      </div>
    </div>
  );
}

export default AdminProductList;
