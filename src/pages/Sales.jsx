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
import { useUser } from '@/context/UserContext'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from 'react'



const Sales = () => {
    const { userInfo } = useUser();
    const region = userInfo.region;
    const fetchSales = async () => {
        let response = null;
        if (userInfo.role === '4826'){
            response =  await axios.get('http://localhost:8080/api/sales/all');
        } else {
            response =  await axios.post('http://localhost:8080/api/sales',{
                region
            });
        }
        console.log(response.data);
        return response.data
    }
    
    const { data, error, isPending } = useQuery({
        queryKey: ['salesList'],
        queryFn: fetchSales,
    });
    console.log(data)

    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <h2 className="mx-auto py-10 ">Sales Data</h2>
            <div className='flex items-center'>
                    {error ? <p className="mx-auto">{error.message}</p>:<></>}
                    {isPending ? <p className="mx-auto">Loading</p>:<></>}
                    {
                    data? 
                    <>
                    <Table className='border-2 w-8/12 mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Sale Amount</TableHead>
                            <TableHead>Sale Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((sale, index) => (
                            <TableRow key={sale.sale_id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{sale.product_name}</TableCell>
                                <TableCell>{sale.region}</TableCell>
                                <TableCell>{sale.sale_amount}</TableCell>
                                <TableCell>{sale.sale_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </>
                : <></>}
            </div>
            {/* <Footer /> */}
        </main>
    )
}

export default Sales