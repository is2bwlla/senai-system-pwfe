import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ModalSubjects from "../../components/modal/subjectModal";
import Head from "../../components/head";
import Footer from "../../components/footer";
import axios from "axios";
import './styles.css';

export default function Subject() {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [setar, setSetar] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/subjects', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [setar]);

    const editSubject = (subject) => {
        setSelectedSubject(subject);  
        setModalOpen(true);  
    };

    const createSubject = async (newSubject) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/subjects', {
                code: newSubject.code,
                subject: newSubject.subject,  
                workload: newSubject.workload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData([...data, response.data]);
            setModalOpen(false);
            setSetar(!setar);  
        } catch (error) {
            console.error("Erro ao criar disciplina", error);
        }
    };

    const updateSubject = async (updatedSubject) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/subject/${updatedSubject.id}`, {
                code: updatedSubject.code,
                subject: updatedSubject.subject,
                workload: updatedSubject.workload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(data.map(subject => (subject.id === updatedSubject.id ? response.data : subject)));
            setModalOpen(false);
            setSetar(!setar); 
        } catch (error) {
            console.error("Erro ao atualizar disciplina", error);
        }
    };

    const deleteSubject = async (subject) => {
        if (window.confirm("Tem certeza?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/subject/${subject.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSetar(!setar);
            } catch (error) {
                console.error("Erro ao excluir disciplina", error);
            }
        }
    };

    return (
        <div className="container_teacher">
            <Head />
            <section className="section-teacher">
                <div className="table-teacher">
                    <h2>Lista de Disciplinas</h2>
                    <table className="teacher-table">
                        <thead>
                            <tr>
                                <th>Editar</th>
                                <th>Excluir</th>
                                <th>ID</th>
                                <th>Código</th>
                                <th>Disciplina</th>
                                <th>Carga Horária</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((subject) => (
                                <tr key={subject.id}>
                                    <td>
                                        <FaEdit className="edit" onClick={() => editSubject(subject)} />
                                    </td>
                                    <td>
                                        <FaTrash className="delete" onClick={() => deleteSubject(subject)} />
                                    </td>
                                    <td>
                                        <span className="id">{subject.id}</span>
                                    </td>
                                    <td>
                                        <span className="ni">{subject.code}</span>
                                    </td>
                                    <td>
                                        <span className="nome">{subject.subject}</span>
                                    </td>
                                    <td>
                                        <span className="email">{subject.workload}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus
                            className="adicionar"
                            onClick={() => {
                                setSelectedSubject(null);  
                                setModalOpen(true);  
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
                <ModalSubjects
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    selectedSubject={selectedSubject}  
                    createSubject={createSubject}
                    updateSubject={updateSubject}
                    setSetar={setSetar}
                    setar={setar}
                />
            </section>
            <Footer />
        </div>
    );
}
