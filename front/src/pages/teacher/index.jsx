import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import ModalProfessores from "../../components/modal/teacherModal";
import Head from "../../components/head";
import Footer from "../../components/footer";
import axios from "axios";
import './styles.css'

export default function Teacher() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [modalOpen, setModalOpen] = useState(false)
    const [professorSelecionado, setProfessorSelecionado] = useState(null)
    const [setar, setSetar] = useState(false)

    // console.log("Token Home: ", token)

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/professores',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data)
                setDados(response.data)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [setar])

    const editar = (professor) => {
        console.log(professor)
        setProfessorSelecionado(professor)
        setModalOpen(true)
    }

    const criar = async (novoProfessor) => {

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    cel: novoProfessor.cel,
                    ocup: novoProfessor.ocup
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoProfessor])
            setModalOpen(false)
            setSetar(!setar)
        } catch (error) {
            console.error(error)
        }

    }

    const deleteTeacher = async (professor) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/professor/${professor.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log("Dados apagados com sucesso...")
                setSetar(!setar)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="container_teacher">
            <Head />
            <section className="section-teacher">
                <div className="table-teacher">
                    <h2>Lista de professores</h2>
                    {dados.map((professor) => (
                        <div className="lista">
                            <div className="col1">
                                <FaEdit className="edit" onClick={() => editar(professor)} />
                            </div>
                            <div className="col2">
                                <FaTrash className="delete" onClick={() => deleteTeacher(professor)} />
                            </div>
                            <div className="col3">
                                <span className="id">{professor.id}</span>
                            </div>
                            <div className="col4">
                                <span className="ni">{professor.ni}</span>
                            </div>
                            <div className="col5">
                                <span className="nome">{professor.nome}</span>
                            </div>
                            <div className="col6">
                                <span className="email">{professor.email}</span>
                            </div>
                            <div className="col7">
                                <span className="cel">{professor.cel}</span>
                            </div>
                            <div className="col8">
                                <span className="ocup">{professor.ocup}</span>
                            </div>
                        </div>
                    ))

                    }
                </div>
                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus
                            className="adicionar"
                            onClick={() => {
                                setProfessorSelecionado(null),
                                    setModalOpen(true)
                            }}
                        />
                    </div>
                    <div className="pesquisar">
                        <input placeholder="ID" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>

                <ModalProfessores
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    professorSelecionado={professorSelecionado}
                    setSetar={setSetar}
                    setar={setar}
                />
            </section>
            <Footer />
        </div>
    )
}