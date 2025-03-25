import React, { useState, useEffect, useRef } from "react";
import './styles.css'
import { AwardIcon } from "lucide-react";
import axios from "axios";

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
    setSetar,
    setar
}) => {
    if (!isOpen) return null

    console.log("Prof Select: ", professorSelecionado)

    const [id, setId] = useState(professorSelecionado?.id || "")
    const [ni, setNi] = useState(professorSelecionado?.ni || "")
    const [nome, setNome] = useState(professorSelecionado?.nome || "")
    const [email, setEmail] = useState(professorSelecionado?.email || "")
    const [cel, setCel] = useState(professorSelecionado?.cel || "")
    const [ocup, setOcup] = useState(professorSelecionado?.ocup || "")
    const [image, setImage] = useState(professorSelecionado?.image || "")
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState('')
    const imageRef = useRef(null)

    //  -- Pega o token do armazenamento pelo nome dele 'token'
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (professorSelecionado) {
            setId(professorSelecionado.id)
            setNi(professorSelecionado.ni || '')
            setNome(professorSelecionado.nome || '')
            setEmail(professorSelecionado.email || '')
            setCel(professorSelecionado.cel || '')
            setOcup(professorSelecionado.ocup || '')
            setImage(professorSelecionado.image || '')
            // Capturar foto

        } else {
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setCel('')
            setOcup('')
            setImage('')
        }

    }, [professorSelecionado])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!ni || !nome || !email || !cel || !ocup || !(imageRef.current instanceof File)) {
            setMessage("Preencha todos os campos.")
            return
        } 

        const fileExtension = imageRef.current.name.split(".").pop()
        const newFileName = `${ni}_${nome.split(' ')[0]}.${fileExtension}}`
        const nameFile = new File([imageRef.current], newFileName, {type: imageRef.current.type})

        const formData = new FormData()
        formData.append("ni", ni)
        formData.append("nome", nome)
        formData.append("email", email)
        formData.append("cel", cel)
        formData.append("ocup", ocup)
        formData.append("image", image)

        try {
            await axios.post("http://127.0.0.1:8000/api/professores", 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setMessage("Dados enviada com sucesso.")
            console.log("Dados enviados com sucesso.")
            setPreview(null)
            onClose(true)

        } catch (error) {
            console.log("Erro ao enviar dados: ", error);
            setMessage("Dados inválidos.")
        }
    }

    const deleteFile =  async (fileName) => {
        if (imageRef) {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete/${fileName}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Deletado com sucesso.")
        }
    }
    const handleFileChange = (e) => {
        if (professorSelecionado) {
            const fileName = professorSelecionado.image.split("/").pop
            deleteFile(fileName)
        }

        const file = e.target.file[0]

        if (!file) return
        
        imageRef.current = file

        const reader = new FileReader()
        reader.onloadend = () => {
            preview('preview: ', file)
        }

        reader.readAsDataURL(file)
        console.log("Preview XXX: ", file);
    }

    const newTeacher = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    cel: cel,
                    ocup: ocup
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados inseridos com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    const editTeacher = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/professor/${id}`,
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    cel: cel,
                    ocup: ocup
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            console.log("Dados atualizados com sucesso...")
            setSetar(!setar)
            onClose(false)
        } catch (error) {

        }
    }

    return (
        <div className="container_container">

            <div className="container_modal">
                <div className="head_modal">
                    <button className="close_button" onClick={onClose}>X</button>
                </div>
                <div className="body_modal">
                    <div className="caixa1">
                        <h2>{professorSelecionado ? "Editar" : "Cadastrar"}</h2>
                            <input
                                className="ni_modal"
                                placeholder="NI"
                                type="text"
                                value={ni}
                                onChange={(e) => setNi(e.target.value)}
                            />
                            <input
                                className="nome_modal"
                                placeholder="Nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                className="email_modal"
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="cel_modal"
                                placeholder="Celular"
                                type="text"
                                value={cel}
                                onChange={(e) => setCel(e.target.value)}
                            />
                            <input
                                className="ocup_modal"
                                placeholder="Ocupação"
                                type="text"
                                value={ocup}
                                onChange={(e) => setOcup(e.target.value)}
                            />
                    </div>
                    <div className="image1">
                        <img src={`http://127.0.0.1:8000/api/images/${ni}_${nome.split(" ")[0]}.png`}/>
                    </div>

                    <div className="image2">
                        <form onSubmit={handleSubmit}>
                            {preview && <img src={preview} alt="preview" className="preview"/>}
                            <input type="file" accept="image/" onChange={handleFileChange} className="fileInput"/> 

                            <button type="submit" className="buttonSave" onClick={(e) => {
                                e.preventDefault()
                                professorSelecionado ? editTeacher(professorSelecionado.id) : handleSubmit(e)}}>
                                    
                                {professorSelecionado ? "Editar" : "Salvar"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="footer_modal">
                    <button
                        type="submit"
                        onClick={professorSelecionado ? editTeacher : newTeacher}
                    >
                        {professorSelecionado ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ModalProfessores