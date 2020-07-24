import React from "react";
import { Link as RRLink } from "react-router-dom";

const Link = (props) => {
  return <RRLink {...props}>{props.children}</RRLink>;
};

export default Link;
