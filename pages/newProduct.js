import Head from "next/head";
import Layout from "../components/Layout";

export default function NewProduct(){
    return(
        <Layout>
            <Head>
                <title>Add Product - Kantin Kejujuran</title>
                <link rel="icon" href="store.png"/>
            </Head>
            <div className="flex justify-center">
                <div className="p-4 w-80  bg-gray-100 rounded-md shadow-md">
                    <form id="formClustering" className='flex flex-col' encType="multipart/form-data">
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productName">Product Name</label>
                        <input name="productName" type="text" className="m-1 border border-gray-300 rounded "/>
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productPrice">Product Price</label>
                        <input name="productPrice" type="number" className="m-1 border border-gray-300 rounded "/>
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="productDescription">Product Description</label>
                        <textarea className="m-1 border border-gray-300 rounded " name="productDescription" cols="40" rows="3" maxLength="100"></textarea>
                        
                        <label className='mx-2 font-medium text-lg text-teal-800' htmlFor="dataFile">Product Image</label>
                        <input className='m-1' type="file" name="dataFile" accept="image/png, image/jpeg" id="" />
                        
                        <button className='shadow-md border-teal-500 bg-teal-400 text-white font-semibold m-2 rounded-md border hover:bg-teal-500 hover:border-teal-600 active:mx-3' >Add Product</button>
                        <p id="errorMessage" className="text-red-500 m-2 font-semibold"></p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
