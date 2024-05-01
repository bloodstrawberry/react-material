// GrandChildComponent.js
import React from "react";
import useSWR from "swr";

//import axios from "axios";
//const fetcher = (url) => axios.get(url).then((res) => res.data);
const fetcher = (url) => fetch(url).then((res) => res.json());

const GrandChildComponent = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/value",
    { fallbackData: { value: 0 } }, // default value
    fetcher
  );

  if (error) return "An error has occurred. " + error;
  if (isLoading) return "Loading...";

  return (
    <div>
      <h4>Grandchild Component</h4>
      <button onClick={() => mutate({ value: data.value + 1 })}>
        Grandchild +
      </button>
      <p>{`Grandchild value : ${data.value}`}</p>
    </div>
  );
};

export default GrandChildComponent;
