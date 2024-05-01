import React, { useEffect } from "react";

import useSWR, { SWRConfig } from "swr";
import ParentComponent from "./ParentComponent.js";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Router1 = () => {
  const { data } = useSWR("/api/value",     { fallbackData: { value: 0 } });

  useEffect(() =>{
    console.log("here!");
    console.log(data);
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <ParentComponent />
    </div>
  );
};

export default Router1;
