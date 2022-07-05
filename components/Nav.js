import Link from "next/link"

export default function Nav(){
    return(
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-4 px-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="text-xl tracking-tight">Kantin Kejujuran</span>
            </div>
            <div className="block items-center w-auto">
                <div className="text-m flex-grow">
                    <Link href="/" >
                        <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                            For Sale
                        </a>
                    </Link>
                    <Link href="/balance">
                        <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                            Store Balance
                        </a>
                    </Link>
                    <Link href="/newProduct">
                        <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                            Add Product
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}