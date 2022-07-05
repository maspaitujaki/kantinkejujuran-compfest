import Head from "next/head";
import Image from "next/image";
import { getAllProduct, getProductById } from ".."
import Layout from "../../components/Layout"
import Link from "next/link";
import { addDots, formatDate } from "../../components/ProductCard";


export default function ProductDetail({productData}){
    return(
        <Layout>
            <Head>
                <title>
                    {productData.Name} - Kantin Kejujuran
                </title>
                <meta name="description" content={"Check out" +productData.Name+" on Kantin Kejujuran"} />
                <link rel="icon" href="/store.png" />
            </Head>
            <div className="bg-gray-100 border rounded-md shadow-lg">
                <div className="flex p-2">
                    <Image className="rounded-md" height={300} width={300} src={productData.ImgUrl} alt=""/>
                    <div className="flex flex-col mx-4 my-2 ">
                        <div className="">
                            <p className="font-semibold text-2xl text-gray-800">
                                {productData.Name}
                            </p>
                            <p className="text-sm text-gray-400">
                                Added:{formatDate(new Date(productData.Date))}
                            </p>
                            <p className="font-bold text-3xl my-3 text-gray-800">
                                Rp{addDots(productData.Price)}
                            </p>
                            <p>
                                {productData.Desc}
                            </p>
                        </div>
                        <div className="flex justify-between mt-auto">
                            <Link href="/">
                                <a className="p-2 m-1 rounded-md bg-blue-400 hover:bg-blue-600 shadow-md text-white">Back</a>
                            </Link>
                            <button className="w-full p-2 m-1 shadow-md rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white"> Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths(){
    const paths = getAllProduct();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const productData = getProductById(params.id);
    return {
        props: {
            productData,
        }
    }
}