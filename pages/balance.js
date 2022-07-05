import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { addDots } from "../components/ProductCard";

export default function Balance(){
    
    return(
        <Layout>
            <Head>
                <title>Balance - Kantin Kejujuran</title>
                <link rel="icon" href="/store.png"/>
            </Head>
            <div className="flex justify-center">
                <div className="p-4 w-80  bg-gray-100 rounded-md shadow-md">
                    <div className="flex justify-between">
                        <p className="font-bold text-2xl text-teal-800">
                            Store Balance
                        </p>
                        <Link href="/">
                            <a className="m-1 text-blue-500 hover:underline hover:text-blue-600">Back</a>
                        </Link>
                    </div>
                    <p className="font-bold text-3xl text-teal-900">
                        Rp{addDots(balance)}
                    </p>
                    <form className="mt-3">
                        <label className='font-medium text-lg text-teal-800' htmlFor="amountWithdraw">Insert amount to withdraw</label>
                        <br/>
                        <input name="amountWithdraw" className="border rounded-md" type="number"></input>
                        <br/>
                        <button className="p-2 mt-2 rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white shadow-md"> Withdraw</button>
                    </form>
                    <form className="mt-3">
                        <label className='font-medium text-lg text-teal-800' htmlFor="amountDeposit">Insert amount to deposit</label>
                        <br/>
                        <input name="amountDeposit" className="border rounded-md" type="number"></input>
                        <br/>
                        <button onClick={addBalance} className="p-2 mt-2 rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white shadow-md">Deposit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}