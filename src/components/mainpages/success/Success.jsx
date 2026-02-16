import React from "react";
import "./Success.css";

function Success() {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✔</div>
        <h1>Order Placed Successfully</h1>
        <p>
          Thank you for shopping with us. Your order has been placed
          successfully and is being processed.
        </p>
        <a href="/history" className="success-btn">
          View My Orders
        </a>
      </div>
    </div>
  );
}

export default Success;
