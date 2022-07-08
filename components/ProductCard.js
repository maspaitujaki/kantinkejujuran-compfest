import Link from "next/link";
import Image from "next/image";
import React from "react";
import axios from 'axios';
import url from "../config/url";

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
export function formatDate(date) {
return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
].join('/');
}
export function addDots(nStr) {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2'); // changed comma to dot here
        }
        return x1 + x2;
}

export default function ProductCard({product}){
    const [img, setImg] = React.useState("");

    React.useEffect(() => {
        axios
            .get(url+"/img/product/"+product.id,{
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
    },[product])
    

    return(
        <Link href={"/product/" + product.id.toString()}>
            <a className="bg-gray-200 max-w-sm rounded overflow-hidden shadow-xl hover:shadow-2xl">
                <div className="">
                    {
                        img &&
                        <Image className="w-full" width={200} height={200} layout="responsive" src={img} alt="" />
                        }
                </div>
                <hr/>
                <div className="p-2">
                    <p className="text-sm text-teal-900 truncate">{product.name}</p>
                    <p className="text-lg text-teal-800 font-bold truncate">Rp {addDots(product.price)}</p>
                    <p className="text-sm text-gray-400">
                                Added:{formatDate(new Date(product.date))}
                    </p>
                </div>
            </a>
        </Link>
    )
}