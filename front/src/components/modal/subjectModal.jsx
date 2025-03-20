import React, { useState, useEffect } from "react";
import './styles.css';

const ModalSubjects = ({
    isOpen,
    onClose,
    selectedSubject,
    updateSubject,
    createSubject
}) => {
    if (!isOpen) return null; 

    const [id, setId] = useState("");
    const [code, setCode] = useState("");
    const [subject, setSubject] = useState("");
    const [workload, setWorkload] = useState("");

    useEffect(() => {
        if (selectedSubject) {
            setId(selectedSubject.id);
            setCode(selectedSubject.code || '');
            setSubject(selectedSubject.subject || '');
            setWorkload(selectedSubject.workload || '');
        } else {
            setId('');
            setCode('');
            setSubject('');
            setWorkload('');
        }
    }, [selectedSubject]);

    const handleSubmit = (e) => {
        e.preventDefault();  

        if (selectedSubject) {
            updateSubject({
                id,
                code,
                subject,
                workload
            });
        } else {
            createSubject({
                code,
                subject,
                workload
            });
        }
    };

    return (
        <div className="container_container">
            <div className="container_modal">
                <div className="head_modal">
                    <button className="close_button" onClick={onClose}>X</button>
                </div>
                <div className="body_modal">
                    <div className="caixa1">
                        <h2>{selectedSubject ? "Editar" : "Cadastrar"} Disciplina</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="ni_modal"
                                placeholder="Código"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)} 
                            />
                            <input
                                className="nome_modal"
                                placeholder="Nome da Disciplina"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)} 
                            />
                            <input
                                className="email_modal"
                                placeholder="Carga Horária"
                                type="text"
                                value={workload}
                                onChange={(e) => setWorkload(e.target.value)} 
                            />
                            <button type="submit">
                                {selectedSubject ? "Atualizar" : "Salvar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSubjects;
