import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const TelaLogin = () => {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate();

    const HandleLogar = () => {
        if (usuario === "admin" && senha === "admin") {
            navigate("/requests")


        } else {
            alert("Usuário ou senha incorretos")
            setSenha("")
            setUsuario("")

        }
    }
    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-lg-5">
                    <form className="p-4 p-md-5 border rounded-3 bg-light">
                        <label for="inputEmail">Usuário</label>
                        <div className="form-floating mb-3">
                            <input type="text" placeholder="Digite o usuário" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
                        </div>
                        <label for="inputPassword">Senha</label>
                        <div className="form-floating mb-3">
                            <input type="password" placeholder="Digite a senha" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                        </div>
                        <button type="button" className="btn btn-success" onClick={HandleLogar}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default TelaLogin;