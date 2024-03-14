import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [balance, setBalance] = useState("");
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    useEffect(() => {
        const fetchBalance = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/accounts/balance", {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            })
            setBalance(response.data.balance)
        }

        fetchBalance()

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`).then((res) => {
            setUsers(res.data.user)
        })
    }, [filter])

    return (
        <div>
            <div className="shadow h-14 flex justify-between">
                <div className="flex flex-col justify-center h-full ml-4">
                    PayTM App
                </div>
                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4">
                        Hello
                    </div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            U
                        </div>
                    </div>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin")
                    }}>Logout</button>
                </div>
            </div>
            <div>
                <div className="flex">
                    <div className="font-bold text-lg">
                        Your balance
                    </div>
                    <div className="font-semibold ml-4 text-lg">
                        Rs {balance}
                    </div>
                </div>
            </div>
            <div>
                <div className="font-bold mt-6 text-lg">
                    Users
                </div>
                <div className="my-2">
                    <input onChange={(e) => {
                        setFilter(e.target.value)
                    }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
                </div>
                <div>
                    {users.map(user => <User key={user._id} user={user} />)}
                </div>
            </div>
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <button onClick={() => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} >Send Money</button>
        </div>
    </div>
}
export default Dashboard
