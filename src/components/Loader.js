import React from "react";

const Loader = ({ loading, children }) =>
  loading ? <progress className="progress is-primary" /> : children;
export default Loader;
