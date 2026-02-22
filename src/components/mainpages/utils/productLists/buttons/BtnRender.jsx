import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalState from "../../../../../GlobalState";

function BtnRender({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  // return (
  //   <div className="btn-row">
  //     {isAdmin ? (
  //       <>
  //         <Link
  //           className="btn btn-danger"
  //           to="#!"
  //           onClick={() => alert("Delete functionality here")}
  //         >
  //           Delete
  //         </Link>
  //         <Link className="btn btn-secondary" to={`/detail/${product._id}`}>
  //           Edit
  //         </Link>
  //       </>
  //     ) : (
  //       <>
  //         <Link
  //           className="btn btn-primary"
  //           to="#!"
  //           onClick={() => addCart(product)}
  //         >
  //           Add to Cart
  //         </Link>
  //         <Link className="btn btn-secondary" to={`/detail/${product._id}`}>
  //           View
  //         </Link>
  //       </>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex gap-3">
      {isAdmin ? (
        <>
          {/* DELETE */}
          <button
            onClick={() => alert("Delete functionality here")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition-all duration-300"
          >
            Delete
          </button>

          {/* EDIT */}
          <Link
            to={`/detail/${product._id}`}
            className="flex-1 text-center bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-medium py-2 rounded-lg transition-all duration-300"
          >
            Edit
          </Link>
        </>
      ) : (
        <>
          {/* ADD TO CART */}
          <button
            onClick={() => addCart(product)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-all duration-300"
          >
            Add to Cart
          </button>

          {/* VIEW */}
          <Link
            to={`/detail/${product._id}`}
            className="flex-1 text-center border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-medium py-2 rounded-lg transition-all duration-300"
          >
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
