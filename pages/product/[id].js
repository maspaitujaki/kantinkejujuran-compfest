import Head from "next/head";
import Image from "next/image";
import { getAllProduct, getProductById } from ".."
import Layout from "../../components/Layout"
import Link from "next/link";
import { addDots, formatDate } from "../../components/ProductCard";
import axios from 'axios'
import url from "../../config/url";
import React from "react";
import { useRouter } from 'next/router';


export default function ProductDetail({productData}){
    const [img,setImg] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        axios
            .get(url+"/img/product/"+productData.id,{
                responseType : "arraybuffer"
            })
            .then(res => {
                const imageBlob = new Blob([res.data])
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImg(imageObjectURL);
            })
            .catch(err => {
                console.log(err)
            })
    },[productData])

    async function buyProduct(event){
        event.preventDefault()
        let addBalanceSuccess = false
        await axios(
            {
                method: "POST",
                url: url+"/balance/add",
                data: {
                    amount: productData.price
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(res => {
                addBalanceSuccess = true
            }).catch(err => {
                addBalanceSuccess = false
            })

        if(!addBalanceSuccess){
            return
        }

        let deleteProductSuccess = false
        await axios.delete(url+"/product/"+productData.id,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => {
            deleteProductSuccess = true
            router.push("/")
        }).catch(err => {
            
        })
        if(!deleteProductSuccess){
            await axios.post(
                url+"/balance/substract",
                {
                    amount: productData.price
                },
                {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                })
                .catch(err => {
                    console.log(err)
                }
            )
        }
    }

    return(
        <Layout>
            <Head>
                <title>
                    {productData.name + " - Kantin Kejujuran" } 
                </title>
                <meta name="description" content={"Check out" +productData.name+" on Kantin Kejujuran"} />
                <link rel="icon" href="/store.png" />
            </Head>
            <div className="bg-gray-100 border rounded-md shadow-lg">
                <div className="flex p-2">
                    {img && <Image className="rounded-md" height={300} width={300} src={img} alt=""/>}
                    <div className="flex flex-col mx-4 my-2 ">
                        <div className="">
                            <p className="font-semibold text-2xl text-gray-800">
                                {productData.name}
                            </p>
                            <p className="text-sm text-gray-400">
                                Added:{formatDate(new Date(productData.date))}
                            </p>
                            <p className="font-bold text-3xl my-3 text-gray-800">
                                Rp{addDots(productData.price)}
                            </p>
                            <p>
                                {productData.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-auto">
                            <Link href="/">
                                <a className="p-2 m-1 rounded-md bg-blue-400 hover:bg-blue-600 shadow-md text-white">Back</a>
                            </Link>
                            <button onClick={buyProduct} className="w-full p-2 m-1 shadow-md rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white">Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths(){
    let products
    await axios(
        {
            method: 'GET',
            url: url+'/pid/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => {
            products = res.data
        })
        .catch(err => {

        });
        
    const paths = products.map((product)=> {
        return {
          params: {
            id: product.id
          }
        }
      })
    return {
        paths,
        fallback: false
    }
}

export async function getServerSideProps({params}){
    // const productData = getProductById(params.id);
    let productData
    await axios(
        {
            method: 'GET',
            url: url+'/product/'+params.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => {
            productData = res.data
        })
        .catch(err => {

        })
    return {
        props: {
            productData
        }
    }
}