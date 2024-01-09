import React from "react";

const Scroll1 = () => {
  const numbers = Array.from({ length: 100 }, (_, index) => index + 1);

  return (
    <div>
      {numbers.map((number) => (
        <p key={number}>　Scroll 1 : {number}</p>
      ))}
    </div>
  );
};

export default Scroll1;
