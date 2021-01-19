import React from "react";

function LinkProps(props) {
  const link = "/items?User=" + props.user;
  return (
    <a className="btn btn-outline-primary" role="button" href={link}>
      test
    </a>
  );
}

export default LinkProps;
