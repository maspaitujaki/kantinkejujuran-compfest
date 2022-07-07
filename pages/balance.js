import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { addDots } from "../components/ProductCard";
import url from "../config/url";
import React from "react";






export default function Balance({balance}){
    const [storeBalance, setStoreBalance] = React.useState(balance)
    const [danger, setDanger] = React.useState(false)

    async function withdraw(event){
        event.preventDefault()
        const amt = parseInt(document.getElementById("amountWithdraw").value)
        if(amt > storeBalance){
            setDanger(true)
            return
        }
        await axios(
            {
                method: 'POST',
                url: url+'/balance',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    amount: storeBalance - amt,
                }
            }
            )
            .then(res => {
                setStoreBalance(res.data.amount)
            })
            .catch(err => {

            })
    
    }

    async function deposit(event){
        event.preventDefault()
        const amt = parseInt(document.getElementById("amountDeposit").value)
        console.log("storeBalance", storeBalance)
        console.log("amount",amt)
        console.log("assert", storeBalance+amt)
        await axios(
            {
                method: 'POST',
                url: url+'/balance',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    amount: storeBalance + amt,
                }
            }
            )
            .then(res => {
                console.log("res", res)
                setStoreBalance(res.data.amount)
            })
            .catch(err => {

            })
    }
    
    return(
        <Layout>
            <Head>
                <title>Balance - Kantin Kejujuran</title>
                <link rel="icon" href="/store.png"/>
            </Head>
            <div className="flex justify-center">
                <div className="p-4 w-80  bg-gray-100 rounded-md shadow-md">
                    <div className="flex justify-center">
                        <p className="font-bold text-2xl text-teal-800">
                            Store Balance
                        </p>
                    </div>
                    <hr className="my-3"></hr>
                    <p className="font-bold text-3xl text-teal-900">
                        Rp{addDots(storeBalance)}
                    </p>
                    <form className="mt-3">
                        <label className='font-medium text-lg text-teal-800' htmlFor="amountWithdraw">Insert amount to withdraw</label>
                        <br/>
                        <input id="amountWithdraw" name="amountWithdraw" className="border rounded-md" type="number"></input>
                        <br/>
                        {
                            danger &&
                            <p className="text-red-700">Amount must lower than balance!</p>
                        }
                        <button onClick={withdraw} className="p-2 mt-2 rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white shadow-md"> Withdraw</button>
                    </form>
                    <form className="mt-3">
                        <label className='font-medium text-lg text-teal-800' htmlFor="amountDeposit">Insert amount to deposit</label>
                        <br/>
                        <input id="amountDeposit" name="amountDeposit" className="border rounded-md" type="number"></input>
                        <br/>
                        <button onClick={deposit} className="p-2 mt-2 rounded-md border-teal-500 bg-teal-400 hover:bg-teal-600 text-white shadow-md">Deposit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}


export async function getStaticProps() {
    let balance = undefined;
    await axios(
            {
            method: 'get',
            url: url + "/balance",
            headers: {
                'Content-Type': 'application/json'
            }
            }
        ).then(
            (response) => {
                balance = response.data.amount;
            }
        ).catch(
            (error) => {
            
            }
        );
    return {
      props: {
        balance,
      }, // will be passed to the page component as props
    }
}