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



const User = () => {
    const { userInfo } = useUser();
    const region = userInfo.region;
    const fetchUsers = async () => {
        const response = await axios.post('http://localhost:8080/api/user/region',{
           region
        });
        console.log(response.data);
        return response.data
    }
    
    const { data, error, isPending } = useQuery({
        queryKey: ['UsersList'],
        queryFn: fetchUsers,
    });
    console.log(data)

    return (
        <main className='flex flex-col w-screen min-h-screen'>
            <Header />
            <h2 className="mx-auto py-10 ">Users Data</h2>
            <div className='flex items-center'>
                    {error ? <p className="mx-auto">{error.message}</p>:<></>}
                    {isPending ? <p className="mx-auto">Loading</p>:<></>}
                    {
                    data? 
                    <>
                    <Table className='border-2 w-8/12 mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Id</TableHead>
                            <TableHead>User First Name</TableHead>
                            <TableHead>User Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Region</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((user, index) => (
                            <TableRow key={user.user_id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.region}</TableCell>
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

export default User