import path from 'path'
import axios from 'axios'

import EcommerceApi from "./src/api/EcommerceApi"

export default {
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    const ecomm = new EcommerceApi({
      authToken: process.env.ASTORIA_FLATIRON_API_TOKEN,
      endpointUrl: process.env.ASTORIA_ECOMMERCE_API_ENDPOINT_URL,
    })
    const categories = await ecomm.categories().then((r) => r.data.categories)
    // const data = res.data;
    // const categories = data.categories;

    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        path: "/shop/new-arrivals",
        getData: () => ({
          subcategories: categories.filter(o => o.name === "New").map(o => o.sub_categories)[0],
        }),
      },
    ]
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
