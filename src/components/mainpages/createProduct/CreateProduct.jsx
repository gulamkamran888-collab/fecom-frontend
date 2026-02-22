import { useContext } from "react";
import ProductForm from "../admin/productForm/ProductForm";
import GlobalState from "../../../GlobalState";
import { useParams } from "react-router-dom";
import authApi from "../../../api/authApi";

function CreateProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    await authApi.post(`/api/products`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Product created");
  };

  // return (
  //   <ProductForm
  //     onSubmit={handleSubmit}
  //     categories={categories}
  //     product={{ product_id: "", title: "", price: "", category: "" }}
  //     isEdit={!!id}
  //     productId={id}
  //   />
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            {id ? "Edit Product" : "Create Product"}
          </h1>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            {id
              ? "Update product details and manage inventory."
              : "Add a new product to your catalog."}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl">
          <ProductForm
            onSubmit={handleSubmit}
            categories={categories}
            product={{ product_id: "", title: "", price: "", category: "" }}
            isEdit={!!id}
            productId={id}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
