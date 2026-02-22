import React, { useContext, useState } from "react";
import GlobalState from "../../../../GlobalState";
import authApi from "../../../../api/authApi";

function Category() {
  const state = useContext(GlobalState);
  const categoriesAPI = state.categoriesAPI;
  const categories = categoriesAPI?.categories?.[0] || [];
  const [token] = state.token;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await authApi.put(
          `/api/category/${id}`,
          { name, image },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Category Updated ✅");
      } else {
        await authApi.post(
          `/api/category`,
          { name, image },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Category Created ✅");
      }

      setName("");
      setImage("");
      setId("");
      setOnEdit(false);
      categoriesAPI.getCategories();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const editCategory = (cat) => {
    setId(cat._id);
    setName(cat.name);
    setImage(cat.image);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await authApi.delete(`/api/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    categoriesAPI.getCategories();
  };

  // return (
  //   <div className="category-container">
  //     <h2>📦 Manage Categories</h2>

  //     <form className="category-form" onSubmit={submitCategory}>
  //       <input
  //         type="text"
  //         placeholder="Category Name"
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         required
  //       />

  //       <input
  //         type="text"
  //         placeholder="Image URL"
  //         value={image}
  //         onChange={(e) => setImage(e.target.value)}
  //         required
  //       />

  //       {image && (
  //         <div className="preview">
  //           <img src={image} alt="preview" />
  //         </div>
  //       )}

  //       <button type="submit" className={onEdit ? "update" : "create"}>
  //         {onEdit ? "Update Category" : "Create Category"}
  //       </button>
  //     </form>

  //     <div className="category-grid">
  //       {categories.map((cat) => (
  //         <div className="category-card" key={cat._id}>
  //           <img src={cat.image} alt={cat.name} />
  //           <h4>{cat.name}</h4>

  //           <div className="actions">
  //             <button onClick={() => editCategory(cat)}>✏️ Edit</button>
  //             <button onClick={() => deleteCategory(cat._id)}>🗑 Delete</button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        📦 Manage Categories
      </h2>

      {/* FORM CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-10">
        <form onSubmit={submitCategory} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {image && (
            <div className="w-32 h-32 border rounded-xl overflow-hidden">
              <img
                src={image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 active:scale-95
            ${
              onEdit
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {onEdit ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="h-40 bg-slate-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-slate-800 mb-4">{cat.name}</h4>

              <div className="flex gap-3">
                <button
                  onClick={() => editCategory(cat)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 rounded-lg text-sm font-medium transition"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deleteCategory(cat._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition active:scale-95"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
