import React, { useEffect, useState } from "react"
import { withRouteData } from "react-static"
import Personalized from "../../containers/Personalized"

export default withRouteData(({ products }) => {
  const [productsForRender, setProductsForRender] = useState(products);

  useEffect(() => {
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

    const personalizedProducts = productsForRender
      .filter(fitFilter)
      .filter(prefFilter)
      .sort(sortPref);

    setProductsForRender(personalizedProducts);

  }, [products]);

  return (
    <Personalized>
      <div>
        <h2>Products</h2>
        <div className="productListContainer">
          {productsForRender && productsForRender.map(p => (
            <div className={"productListItemContainer " + p.color}>
              <span className="productName">{p.name} ({p.size})</span>
              <div className="productImageContainer">
                <img className="productImage" src={p.imageUrl}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Personalized>
  );
});
