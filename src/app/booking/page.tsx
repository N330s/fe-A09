'use client'

import DateReserve from "@/components/DateReserve";
import FormControl from "@mui/material/FormControl";
import { Menu, TextField } from "@mui/material";
import {Select, MenuItem} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function Booking () {
    
    const session = await getServerSession(authOptions);
    if(!session ||  !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);


    return (
        <main>
            <div className = 'text-black'>
            <table className='table-auto border-seperate border-spacing-2'>
            <tbody>
                <tr><td>Name</td><td>{profile.data.name}</td></tr>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody>
            </table>
            </div>

            <FormControl>
                <TextField variant = 'standard' name = 'Name-Lastname' label = 'Name-Lastname'/>
                <TextField variant = 'standard' name = 'Contact-Number' label = 'Contact-Number'/>
                <Select id = 'venue' variant = 'standard' name = 'venue'>
                    <MenuItem value = 'Bloom'>The Bloom Pavilion</MenuItem>
                    <MenuItem value = 'Spark'>Spark Space</MenuItem>
                    <MenuItem value = 'GrandTable'>The Grand Table</MenuItem>
                </Select>
                <DateReserve/>
                <button className ='black rounded-md bg-sky-600 hover:indigo-600' name = 'Book Venue'>
                    Book Venue
                </button>
            </FormControl>
        </main>
    );
}