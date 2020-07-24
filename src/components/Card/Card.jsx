import React from "react";

const Card = ({ children, title }) => {
  return (
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">{title}</span>
        {children}
      </div>
    </div>
  );
};

export default Card;
