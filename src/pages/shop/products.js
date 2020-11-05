import React from "react"
import { withRouteData } from "react-static"
import Personalized from "../../containers/Personalized"

export default withRouteData(({ products }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fitFilter = (p) => !user || p.size === user.fit.shirt.size;
  const prefFilter = (p) => !user || !user.preferences.dislike.colors.includes(p.color);

  const sortPref = (prv, nxt) => {
    if (!user) {
      return 0;
    }
    else {
      const likedColors = user.preferences.like.colors;

      if (likedColors.includes(prv.color)) {
        return -1;
      }
      else {
        return 0;
      }
    }
  };

  const personalizedProducts = products
    .filter(fitFilter)
    .filter(prefFilter)
    .sort(sortPref);

  return (
    <Personalized>
      <div>
        <h2>Products</h2>
        <div>
          {personalizedProducts.map(p => (
            <div>
              <span>{p.name}</span>
              <img src={p.imageUrl}/>
            </div>
          ))}
        </div>
      </div>
    </Personalized>
  );
});
