import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"

export default withRouteData(({ subcategories }) => (
  <div>
    <h2>New</h2>
    <ul>
      {(subcategories || []).map(sub => (
        <li>
          <Link to={`/shop/${sub.permalink}`}>{sub.name}</Link>
        </li>
      ))}
    </ul>
  </div>
));
