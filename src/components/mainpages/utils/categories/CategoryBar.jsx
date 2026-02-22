import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";

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

  // return (
  //   <div className="category-wrapper">
  //     <button className="scroll-btn left" onClick={() => scroll("left")}>
  //       ◀
  //     </button>

  //     <div className="category-bar" ref={scrollRef}>
  //       {categories.map((cat) => (
  //         <div
  //           key={cat._id}
  //           className={`category-item ${
  //             activeCategory === cat._id ? "active" : ""
  //           }`}
  //           onClick={() => navigate(`/category/${cat._id}`)}
  //         >
  //           <img src={cat.image} alt={cat.name} />
  //           <p>{cat.name}</p>
  //         </div>
  //       ))}
  //     </div>

  //     <button className="scroll-btn right" onClick={() => scroll("right")}>
  //       ▶
  //     </button>
  //   </div>
  // );

  return (
    <div className="relative w-full">
      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-slate-100 transition"
      >
        ◀
      </button>

      {/* CATEGORY SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-4 scroll-smooth"
      >
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/category/${cat._id}`)}
            className={`flex-shrink-0 w-28 cursor-pointer group transition ${
              activeCategory === cat._id ? "scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`w-24 h-24 mx-auto rounded-2xl overflow-hidden border transition ${
                activeCategory === cat._id
                  ? "border-indigo-500 shadow-lg"
                  : "border-slate-200 group-hover:border-indigo-400"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p
              className={`text-sm mt-3 text-center font-medium ${
                activeCategory === cat._id
                  ? "text-indigo-600"
                  : "text-slate-600 group-hover:text-slate-900"
              }`}
            >
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 items-center justify-center hover:bg-slate-100 transition"
      >
        ▶
      </button>
    </div>
  );
}

export default CategoryBar;
