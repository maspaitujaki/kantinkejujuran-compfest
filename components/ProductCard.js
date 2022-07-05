import Link from "next/link";
import Image from "next/image";

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

    return(
        <Link href={"/product/" + product.Id.toString()}>
            <a className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-xl hover:shadow-2xl">
                <div className="">
                    <Image className="w-full" width={200} height={200} layout="responsive" src={product.ImgUrl} alt="" />
                </div>
                <hr/>
                <div className="p-2">
                    <p className="text-sm text-teal-900 truncate">{product.Name}</p>
                    <p className="text-lg text-teal-800 font-bold truncate">Rp {addDots(product.Price)}</p>
                </div>
            </a>
        </Link>
    )
}