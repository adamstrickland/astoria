import React from "react"
import { withRouteData } from "react-static"
import Personalized from "../../containers/Personalized"

export default withRouteData(({ products }) => (
  <Personalized>
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
  </Personalized>
));

