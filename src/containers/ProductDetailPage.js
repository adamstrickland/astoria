import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from 'components/Router'

export default function ProductDetailPage() {
  const { product } = useRouteData()
  return (
    <div className="pdpContainer">
      <h1>{product.name}</h1>
      <div className="pdpDetailsContainer">
        <div className="pdpImageRollover">
        </div>
        <div className="pdpDetailsDescriptionContainer">
          {product.description}
        </div>
      </div>
    </div>
  )
}
