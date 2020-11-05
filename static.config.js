import path from 'path'
import axios from 'axios'
import React from "react"

import EcommerceApi from "./src/api/EcommerceApi"

export default {
  Document: ({
    Html,
    Head,
    Body,
    children,
    state: {
      inlineScripts,
      renderMeta,
      routeInfo,
      siteData,
    },
  }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bonobos</title>
      </Head>
      <Body>
        { children }
      </Body>
    </Html>
  ),

  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const ecomm = new EcommerceApi({
      authToken: process.env.ASTORIA_FLATIRON_API_TOKEN,
      endpointUrl: process.env.ASTORIA_ECOMMERCE_API_ENDPOINT_URL,
    });
    const categories = await ecomm.categories().then((r) => r.data.categories);

    const products = await axios.get("http://localhost:4000/products").then((r) => r.data);

    return [
      {
        path: "/shop/new-arrivals",
        getData: () => ({
          subcategories: categories.filter(o => o.name === "New").map(o => o.sub_categories)[0],
        }),
      },
      {
        path: "/shop/products",
        getData: async () => ({
          products: products,
        }),
        children: products.map(product => ({
          path: `/${product.slug}`,
          template: "src/containers/ProductDetailPage",
          getData: () => ({ product, }),
        })),
      },
    ];
  },

  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
