import React, { useState } from "react";
import './styles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const logar = async () => {
        console.log("Usuário: ", user)
        console.log("Senha: ", password)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/',
                {
                    username: user,
                    password: password
                }
            )
            console.log("Token Login", response.data.access)
            localStorage.setItem('token', response.data.access)
            navigate('/teacher')
        } catch (error) {
            console.error(error)
        }


    }

    return (
        <div className="container_login">
            <section className="section_login">
                <FiUser className="user" />
                <p>Usuário:</p>
                <input
                    className="caixa"
                    placeholder="User"
                    type="text"
                    value={user}
                    onChange={(e) => { setUser(e.target.value) }}
                />
                <p>Senha:</p>
                <input
                    className="caixa"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button className="btn" onClick={logar}>
                    Enter
                </button>
            </section>
        </div>
    )
}