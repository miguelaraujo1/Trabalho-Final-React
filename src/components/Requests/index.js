import { useState, useEffect } from 'react';
import { FaPlus, FaDownload, FaStop } from 'react-icons/fa';
import Card from '../Card';
import api from '../../services/api'
import useAxiosGet from '../../hooks/useAxiosGet';
import { useNavigate, Link } from 'react-router-dom'
import App from './App.css'


const Requests = () => {

    const navigate = useNavigate();

    // const [renderizar, setRenderizar] = useState(null)
    const [produto, setProduto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [dataFabricacao, setDataFabricacao] = useState("");
    const [valorCusto, setValorCusto] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [idCategoria, setIdCategoria] = useState(1);
    const [idCount, setIdCount] = useState(0);
    const [editando, setEditando] = useState({ edit: false, id: null });
    const { tasks } = useAxiosGet('/produtos')
    const [tarefas, setTarefas] = useState([

    ])


    useEffect(() => {
        if (!tasks) return
        // console.log(tasks)
        setTarefas(tasks)
        setIdCount(tasks.length)
    }, [tasks])

    const adicionarTarefa = async () => {
        if (produto === "" || descricao === "" || quantidade === "" || dataFabricacao === "" || valorCusto === "" || valorVenda === "") {
            alert("Preencha todos os campos para poder cadastrar um produto")


            setProduto("")
            setDescricao("")
            setQuantidade("")
            setDataFabricacao("")
            setValorCusto("")
            setValorVenda("")
            // setRenderizar(true)

            return
        }
        const novaTarefa = {
            nomeProduto: produto,
            descricaoProduto: descricao,
            qtEstoque: quantidade,
            dtFabricacao: dataFabricacao,
            vlCusto: valorCusto,
            vlUnitario: valorVenda,
            categoria: { id: idCategoria }
        }
        const { data } = await api.post('/produtos', novaTarefa)

        setTarefas(arr => [
            ...arr,
            data
        ])

        setProduto("")
        setDescricao("")
        setQuantidade("")
        setDataFabricacao("")
        setValorCusto("")
        setValorVenda("")
        alert("Produto cadastrado com sucesso")

        // navigate("/login")
        // navigate("/requests")

        // window.location.reload();
    }

    const editarTarefa = (tarefa) => {

        setEditando({ edit: true, id: tarefa.idProduto })
        setProduto(tarefa.nomeProduto)
        setDescricao(tarefa.descricaoProduto)
        setQuantidade(tarefa.qtEstoque)
        setDataFabricacao(tarefa.dtFabricacao)
        setValorCusto(tarefa.vlCusto)
        setValorVenda(tarefa.vlUnitario)
        setIdCategoria(tarefa.categoria.id)
    }

    const excluirTarefa = async (idProduto) => {
        console.log(idProduto)
        const { data: tarefaExcluida } = await api.delete(`/produtos/${idProduto}`)
        const tarefasFiltradas = tarefas.filter(tarefa => tarefa.idProduto !== tarefaExcluida.idProduto)
        setTarefas(tarefasFiltradas);

    }

    const cancelar = () => {
        setEditando({ edit: false, id: null })
        setProduto("")
        setDescricao("")
        setQuantidade("")
        setDataFabricacao("")
        setValorCusto("")
        setValorVenda("")
    }

    const salvar = async () => {
        const tarefaEditada = {
            nomeProduto: produto,
            descricaoProduto: descricao,
            qtEstoque: quantidade,
            dtFabricacao: dataFabricacao,
            vlCusto: valorCusto,
            vlUnitario: valorVenda,
            categoria: { id: idCategoria }

        }

        const { data } = await api.put(`/produtos/${editando.id}`, tarefaEditada)

        const tarefasEditadas = tarefas.map(tarefa => {
            if (tarefa.id === data.id) {
                return {
                    id: tarefa.id,
                    ...tarefaEditada
                }
            }
            return tarefa
        })
        setTarefas(tarefasEditadas)
        setEditando({ edit: false, id: null })
        setProduto("")
        setDescricao("")
        setQuantidade("")
        setDataFabricacao("")
        setValorCusto("")
        setValorVenda("")

    }

    return (
        <>
            <br />

            <div className="container" style={{ backgroundColor: 'light', color: 'dark' }} >
                <h2 className="text-center">Controle de produtos</h2>
                <br />

                <div className="d-flex justify-content-center">
                    <div className="col-md-4">
                        <label className="d-flex justify-content-center form-label">Produto</label>
                        <input type="text" className="form-control" placeholder="Nome do produto" value={produto} onChange={e => setProduto(e.target.value)} />
                    </div>
                </div>

                <br />

                <form className="d-flex justify-content-center row g-4">
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label" >Descrição</label>
                        <input type="text" className="form-control" placeholder="Descrição do produto" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label" >Quantidade</label>
                        <input type="text" className="form-control" placeholder="Quantidade do produto" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label">Data de fabricação</label>
                        <input type="text" className="form-control" placeholder="AAAA-MM-DD" value={dataFabricacao} onChange={e => setDataFabricacao(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label" >Valor de custo R$</label>
                        <input type="text" className="form-control" placeholder="00.00" value={valorCusto} onChange={e => setValorCusto(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label" >Valor de venda R$</label>
                        <input type="text" className="form-control" placeholder="00.00" value={valorVenda} onChange={e => setValorVenda(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                        <label className="d-flex justify-content-center form-label">Categoria</label>
                        <select className="form-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                            <option value={1}>Frutas</option>
                            <option value={2}>Verduras</option>
                            <option value={3}>Laticínios</option>
                            <option value={4}>Cereais</option>
                            <option value={5}>Bebidas</option>
                        </select>
                    </div>
                    <div className="col-12 mb-4">
                        {editando.edit ?
                            <>
                                <button type="button" className="btn btn-sm btn-outline-warning" onClick={cancelar}>
                                    <div className="d-flex align-items-center">
                                        <FaStop className="me-2" />
                                        Cancelar
                                    </div>
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-success ms-2" onClick={salvar}>
                                    <div className="d-flex align-items-center">
                                        <FaDownload className="me-2" />
                                        Salvar
                                    </div>
                                </button>
                            </>
                            :
                            <button type="button" className="btn btn-success" onClick={adicionarTarefa}>
                                <div className="d-flex align-items-center">
                                    <FaPlus className="me-2" />
                                    Adicionar
                                </div>
                            </button>
                        }
                    </div>
                </form>

                {tarefas.map((tarefa) => <Card key={tarefa.idProduto} tarefa={tarefa} editarTarefa={editarTarefa} excluirTarefa={() => { excluirTarefa(tarefa.idProduto) }} />)}


                <button className="btn btn-outline-light" ><Link className='link' to="/login">Home</Link></button>

                <br />
            </div>
        </>
    );
}

export default Requests;
