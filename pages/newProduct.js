import Head from "next/head";
import Layout from "../components/Layout";
import axios from 'axios'
import url from "../config/url";
import React from "react";

export default function NewProduct(){
    const [isLoading, setIsLoading] = React.useState(false)
    const [mustFilled, setMustFilled] = React.useState([])

    async function addProduct(event){
        event.preventDefault()

        
        const form = document.getElementById("formProduct")
        const formData = new FormData(form)

        setMustFilled([])
        
        let flagArr = []
        if(formData.get("productName") === ""){
            flagArr.push("- Product name must be filled")
        }
        if(formData.get("productPrice") === ""){
            flagArr.push("- Product price must be filled")
        }
        if(formData.get("productImage").name === ""){
            flagArr.push("- Product image must be filled")
        }

        if(flagArr.length > 0){
            setMustFilled(flagArr)
            return
        }
        
        setIsLoading(true)


        await axios.post(url + "/product", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            responseType: 'arraybuffer'
            })
            .then(res => {
                setIsLoading(false)
                alert("Product added")
                document.getElementById("formProduct").reset()
            })
            .catch(err => {
                console.log(err)
            });
    }

    return(
        <Layout>
            <Head>
                <title>Add Product - Kantin Kejujuran</title>
                <link rel="icon" href="store.png"/>
            </Head>
            <div className="flex justify-center">
                <div className="p-4 w-80  bg-gray-100 rounded-md shadow-md">
                    <div className="flex justify-center">
                            <p className="font-bold text-2xl text-teal-800">
                                New Product
                            </p>
                    </div>
                    <hr className="my-3"></hr>
                    <form id="formProduct" className='flex flex-col' encType="multipart/form-data">
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productName">Product Name</label>
                        <input id="productName" name="productName" type="text" className="m-1 border border-gray-300 rounded " />
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productPrice">Product Price</label>
                        <input id="productPrice" name="productPrice" type="number" className="m-1 border border-gray-300 rounded " min={0}/>
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productDescription">Product Description</label>
                        <textarea className="m-1 border border-gray-300 rounded " id="productDescription" name="productDescription" cols="40" rows="3" maxLength="100"></textarea>
                        
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productImage">Product Image</label>
                        <input className='m-1' type="file" name="productImage" accept="image/png, image/jpeg" id="productImage" />
                        
                        <button onClick={addProduct} className='shadow-md border-teal-500 bg-teal-400 text-white font-semibold m-2 rounded-md border hover:bg-teal-500 hover:border-teal-600 active:mx-3' {...isLoading? "disable":""}>{isLoading? "Adding Product...":"Add Product"}</button>
                        {
                            mustFilled.map((item, index) => {
                                return(
                                    <p className="text-red-500 text-sm" key={index}>{item}</p>
                                )
                            }
                            )
                        }
                    </form>
                </div>
            </div>
        </Layout>
    )
}
