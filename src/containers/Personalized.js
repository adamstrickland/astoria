import React from 'react'
import Welcome from "../components/Welcome"

export default ({ children }) => {
  return (
    <React.Fragment>
      <Welcome />

      { children }
    </React.Fragment>
  );
}


