import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import "./CategoryBar.css";

function CategoryBar() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [activeCategory] = state.productAPI.category;
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollLeft -= 200;
    } else {
      scrollRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="category-wrapper">
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        ◀
      </button>

      <div className="category-bar" ref={scrollRef}>
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={`category-item ${
              activeCategory === cat._id ? "active" : ""
            }`}
            onClick={() => navigate(`/category/${cat._id}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
}

export default CategoryBar;
