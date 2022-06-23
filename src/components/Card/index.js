import { FaTrash, FaPen, FaRegSmileBeam, FaRegMeh, FaRegTired } from "react-icons/fa";

const Card = ({ tarefa, editarTarefa, excluirTarefa }) => {


    const handleCategoria = () => {
        switch (tarefa.categoria) {
            case '1':
                return "Frutas";
            case '2':
                return "Verduras"
            case '3':
                return "Laticínios"
            case '4':
                return "Cereais"
            case '5':
                return "Bebidas"
            default:
                return ''
        }
    }

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-header d-flex justify-content-between">
                <span>Nome do produto: {tarefa.nomeProduto}</span>
                <span className="d-flex align-items-center">Categoria: {tarefa.categoria.nomeCategoria}</span>

            </div>
            <div className="card-body">
                <p className="card-text">Descrição: {tarefa.descricaoProduto}</p>
                <p className="card-text">Quantidade em estoque: {tarefa.qtEstoque}</p>
                <p className="card-text">Data de fabricação: {tarefa.dtFabricacao}</p>
                <p className="card-text">Valor de custo: R${tarefa.vlCusto}</p>
                <p className="card-text">Valor de venda: R${tarefa.vlUnitario}</p>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => editarTarefa(tarefa)}>
                        <div className="d-flex align-items-center">
                            <FaPen className="me-2" />
                            Editar
                        </div>
                    </button>
                    <button className="btn btn-sm btn-warning ms-2" onClick={() => excluirTarefa(tarefa.idProduto)}>
                        <div className="d-flex align-items-center">
                            <FaTrash className="me-2" />
                            Excluir
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Card;