import React from "react";

import * as gh from "../githublibrary.js";

const Router1= () => {
  const test = async () => {
    let test = await gh.fileRead("README.md");
    console.log(test);
  }

  return (
    <div>
      <p>Router 1</p>
      <button onClick={test}>test</button>      
    </div>
  );
};

export default Router1;
