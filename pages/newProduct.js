import Head from "next/head";
import Layout from "../components/Layout";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import url from "../config/url";

export default function NewProduct(){
    async function addProduct(event){
        event.preventDefault()
        const id = uuidv4()
        const name = document.getElementById("productName").value
        const price = parseInt(document.getElementById("productPrice").value)
        const description = document.getElementById("productDescription").value
        const date = Date().toString()
        const selectedFile = document.getElementById('productImage').files[0];
        const image = selectedFile.name + "-" + id;
        const newPost = {
            id,
            name,
            price,
            description,
            date,
            image
        }
        
        await axios(
            {
                method: 'POST',
                url: url+'/product',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: newPost
            }
            )
            .then(res => {
                console.log("test")
            })
            .catch(err => {
                console.log(err)
            })
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
                    <form id="formClustering" className='flex flex-col' encType="multipart/form-data">
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productName">Product Name</label>
                        <input id="productName" name="productName" type="text" className="m-1 border border-gray-300 rounded "/>
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productPrice">Product Price</label>
                        <input id="productPrice" name="productPrice" type="number" className="m-1 border border-gray-300 rounded "/>
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productDescription">Product Description</label>
                        <textarea className="m-1 border border-gray-300 rounded " id="productDescription" name="productDescription" cols="40" rows="3" maxLength="100"></textarea>
                        
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="dataFile">Product Image</label>
                        <input className='m-1' type="file" name="dataFile" accept="image/png, image/jpeg" id="productImage" />
                        
                        <button onClick={addProduct} className='shadow-md border-teal-500 bg-teal-400 text-white font-semibold m-2 rounded-md border hover:bg-teal-500 hover:border-teal-600 active:mx-3' >Add Product</button>
                        <p id="errorMessage" className="text-red-500 m-2 font-semibold"></p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
