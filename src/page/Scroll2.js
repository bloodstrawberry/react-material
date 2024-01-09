import React from "react";

const Scroll2 = () => {
  const numbers = Array.from({ length: 100 }, (_, index) => index + 1);

  return (
    <div>
      {numbers.map((number) => (
        <p key={number}>　Scroll 2 : {number}</p>
      ))}
    </div>
  );
};

export default Scroll2;
