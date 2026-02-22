import React from "react";

function Success() {
  // return (
  //   <div className="success-container">
  //     <div className="success-card">
  //       <div className="success-icon">✔</div>
  //       <h1>Order Placed Successfully</h1>
  //       <p>
  //         Thank you for shopping with us. Your order has been placed
  //         successfully and is being processed.
  //       </p>
  //       <a href="/history" className="success-btn">
  //         View My Orders
  //       </a>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">
        {/* SUCCESS ICON */}
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl text-green-600">✔</span>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">
          Order Placed Successfully
        </h1>

        {/* MESSAGE */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          Thank you for shopping with us. Your order has been placed
          successfully and is being processed.
        </p>

        {/* BUTTON */}
        <a
          href="/history"
          className="inline-block w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View My Orders
        </a>
      </div>
    </div>
  );
}

export default Success;
