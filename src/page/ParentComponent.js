// ParentComponent.js
import React, { useState } from "react";
import useSWR from "swr";
import ChildComponent from "./ChildComponent";

//import axios from "axios";
//const fetcher = (url) => axios.get(url).then((res) => res.data);
const fetcher = (url) => fetch(url).then((res) => res.json());

const ParentComponent = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher);

  if (error) return "An error has occurred. " + error;
  if (isLoading) return "Loading...";

  return (
    <div>
      <button onClick={() => console.log(data)}>test</button>
      <h2>Parent Component</h2>
      <button onClick={() => mutate({ value: data.value + 1 })}>
        Parent +
      </button>
      <p>{`Parent value : ${data.value}`}</p>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;
