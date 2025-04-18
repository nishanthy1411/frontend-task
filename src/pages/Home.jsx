import Footer from "@/components/footer"
import Header from "@/components/header"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from 'react'


const Home = () => {
    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/api/products')
        return response.data
    }

    const { data, error, isPending } = useQuery({
        queryKey: ['productsList'],
        queryFn: fetchProducts,
    });
    console.log(data)
    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <h2 className="mx-auto py-10 ">Products Data</h2>
            <div className='flex items-center'>
                <Table className='border-2 w-8/12 mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product id</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Prize</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell>{product.productId}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* <Footer /> */}
        </main>
    )
}

export default Home