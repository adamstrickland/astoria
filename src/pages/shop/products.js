import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(({ products }) => (
  <div>
    <h2>Products</h2>
    <div>
      {products.map(p => (
        <div>
          <span>{p.name}</span>
          <img src={p.imageUrl}/>
        </div>
      ))}
    </div>
  </div>
));

