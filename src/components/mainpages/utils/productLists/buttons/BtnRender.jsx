// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import GlobalState from "../../../../GlobalState";

// function BtnRender({ product }) {
//   const state = useContext(GlobalState);
//   const [isAdmin] = state.userAPI.isAdmin;
//   const addCart = state.userAPI.addCart;

//   return (
//     <div className="row_btn">
//       {isAdmin ? (
//         <>
//           <Link id="btn_buy" to="#!">
//             Delete
//           </Link>
//           <Link id="btn_view" to={`/detail/${product._id}`}>
//             Edit
//           </Link>
//         </>
//       ) : (
//         <>
//           <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
//             Add to Cart
//           </Link>
//           <Link id="btn_view" to={`/detail/${product._id}`}>
//             View
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }

// export default BtnRender;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalState from "../../../../../GlobalState";
import "./BtnRender.css";

function BtnRender({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div className="btn-row">
      {isAdmin ? (
        <>
          <Link
            className="btn btn-danger"
            to="#!"
            onClick={() => alert("Delete functionality here")}
          >
            Delete
          </Link>
          <Link className="btn btn-secondary" to={`/detail/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link
            className="btn btn-primary"
            to="#!"
            onClick={() => addCart(product)}
          >
            Add to Cart
          </Link>
          <Link className="btn btn-secondary" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
