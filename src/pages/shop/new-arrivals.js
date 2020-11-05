import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"
import Personalized from "../../containers/Personalized"

export default withRouteData(({ subcategories }) => (
  <Personalized>
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
  </Personalized>
));
