import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full  ">
                    <h1 className="mb-8 text-3xl text-center">Sign In</h1>


                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }} />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />


                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                    username,
                                    password
                                })
                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                            } catch (error) {
                                alert(error.response.data.message)
                            }
                        }}
                    >
                        Sign In
                    </button>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account ?
                    <a onClick={() => {
                        navigate("/signup")
                    }} className="no-underline border-b border-blue text-blue cursor-pointer" >
                        Sign up
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Signin
