import React from "react";

function Category({ onClick, image, label }) {
  return (
      <div>
        <button onClick={onClick} className="outline-none">
          <img src={image} alt="" className="w-20 h-20" />
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {label}
          </p>
        </button>
      </div>
  );
}

export default Category;
