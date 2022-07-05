import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import products from '../components/Products'
import balance from '../components/Balance'
import React from 'react'

export function getAllProduct(){
  return products.map((product)=> {
    return {
      params: {
        id: product.Id.toString()
      }
    }
  })
}

export function getProductById(id){
  const selectedProduct = products.filter((product) => product.Id.toString() === id)[0]
  console.log(selectedProduct)
  return{
    ...selectedProduct
  }
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kantin Kejujuran</title>
        <meta name="description" content="Kantin Kejujuran By Dimas FM" />
        <link rel="icon" href="/store.png" />
      </Head>
      <Layout>
        <div className="grid grid-cols-4 gap-4">
                {
                    products.map(product => {
                        return <ProductCard key={product.Id} product={product} />
                    })
                }
            </div>
      </Layout>

    </div>
  )
}
