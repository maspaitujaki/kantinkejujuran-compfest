import Head from 'next/head'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import React from 'react'
import axios from "axios";
import url from '../config/url';

export function getAllProduct({}){
  return products.map((product)=> {
    return {
      params: {
        id: product.Id.toString()
      }
    }
  })
}

// export function getProductById(id){
//   const selectedProduct = products.filter((product) => product.Id.toString() === id)[0]
//   console.log(selectedProduct)
//   return{
//     ...selectedProduct
//   }
// }

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>Kantin Kejujuran</title>
        <meta name="description" content="Kantin Kejujuran By Dimas FM" />
        <link rel="icon" href="/store.png" />
      </Head>
      <Layout className="">
        <div className="bg-gray-100 p-3 rounded-md ">
          <div className='flex justify-center'>
            <h1 className='font-bold text-2xl text-teal-800'>
              For Sale
            </h1>
          </div>
          <hr className='my-3'></hr>
          <div className='flex'>
            <div className='mr-2'>
              <div className='bg-gray-200 rounded-md shadow-sm p-1 pr-4'>
              <p className='text-teal-800 text-md font-semibold'>Sort By</p>
              <input type="radio" name="sortBy" value="name"/> <span className='text-teal-800 font-semibold'>Name</span><br/>
              <input type="radio" name="sortBy" value="date"/> <span className='text-teal-800 font-semibold'>Date</span><br/>
              </div>
            </div>
            <div className='flex-1 grid grid-cols-4 gap-2'>
                  {
                    products.map(product => {
                      return <ProductCard key={product.id} product={product} />
                    })
                  }
              </div>
            </div>
          </div>
      </Layout>

    </div>
  )
}

export async function getStaticProps(){
  let products
  await axios(
    {
    method: 'get',
    url: url + "/product",
    headers: {
        'Content-Type': 'application/json'
    }
    }
).then(
    (response) => {
        products = response.data;
    }
).catch(
    (error) => {
    
    }
);
  return {
    props: {
      products
    }
  }
}