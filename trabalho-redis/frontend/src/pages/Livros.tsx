import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'
import { useToast } from '../components/toast'

function Livros() {
  const [livros, setLivros] = useState<any[]>([])
  const [idBusca, setIdBusca] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { showToast, Toast } = useToast()
  const [saindo, setSaindo] = useState(false)
  const thStyle = {
    padding: '16px',
    fontSize: '16px',
    borderBottom: '2px solid #ddd',
  }
  const tdStyle = {
      padding: '14px',
  }

 async function listarLivros() {

  const response = await api.get('/livros')

  const livrosOrdenados = response.data.livros.sort(
    (a: any, b: any) => Number(a.id) - Number(b.id)
  )

  setLivros(livrosOrdenados)
}

  async function buscarLivro() {
    if (!idBusca) {
      listarLivros()
      return
    }

    try {
      const response = await api.get(`/livros/${idBusca}`)
      setLivros([response.data])
    } catch (error) {
      setLivros([])
      showToast('Livro não encontrado', 'error')
    }
  }

  async function confirmarDelete() {
    if (!deleteId) return

    try {
      await api.delete(`/livros/${deleteId}`)
      showToast('Livro deletado com sucesso', 'success')
      setDeleteId(null)
      listarLivros()
    } catch (error) {
      showToast('Erro ao deletar livro', 'error')
    }
  }

function editarLivro(id: string) {

  setSaindo(true)

  setTimeout(() => {
    navigate(`/editar/${id}`)
  }, 300)
}

  useEffect(() => { listarLivros() }, [])

  return (
    <div style={{
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',

      transition: '0.3s ease',
      opacity: saindo ? 0 : 1,
      transform: saindo
        ? 'translateY(20px)'
        : 'translateY(0px)',
    }}>
        <Toast />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

            <h1 style={{
              margin: 0,
              fontSize: '28px',
              color: '#222',
            }}>
              Lista de livros
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1vh',
            }}>

              <input
                type="text"
                placeholder="Busque um livro por ID"
                value={idBusca}
                onChange={(e) => setIdBusca(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  fontSize: '15px',
                  minWidth: '250px',
                }}
              />

              <button
                onClick={buscarLivro}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: '0.2s',
                }}
              >
                Buscar
              </button>

            </div>
        </div>

        { livros.length === 0 ? (<p>Nenhum livro cadastrado</p>) 
        : (
<table style={{
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '3vh',
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
}}>

    <thead style={{
      backgroundColor: '#f3f3f3',
    }}>
        <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Autor</th>
            <th style={thStyle}>Categoria</th>
            <th style={thStyle}>Ano</th>
            <th style={thStyle}>Quantidade</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Ações</th>
        </tr>
    </thead>

    <tbody>
        {livros.map((livro) => (
        <tr
          key={livro.id}
          style={{
            borderBottom: '1px solid #eee',
          }}
        >

            <td style={tdStyle}>{livro.id}</td>
            <td style={tdStyle}>{livro.titulo}</td>
            <td style={tdStyle}>{livro.autor}</td>
            <td style={tdStyle}>{livro.categoria}</td>
            <td style={tdStyle}>{livro.ano_publicacao}</td>
            <td style={tdStyle}>{livro.quantidade_disponivel}</td>

            <td style={tdStyle}>
              <span style={{
                backgroundColor:
                  livro.status === 'Disponível'
                    ? '#d4edda'
                    : '#f8d7da',

                color:
                  livro.status === 'Disponível'
                    ? '#155724'
                    : '#721c24',

                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}>
                {livro.status}
              </span>
            </td>

            <td style={{
              ...tdStyle,
              display: 'flex',
              justifyContent: 'center',
              gap: '1vh',
            }}>

                <button
                  onClick={() => editarLivro(livro.id)}
                  style={{
                    padding: '8px 14px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => setDeleteId(livro.id)}
                  style={{
                    padding: '8px 14px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Deletar
                </button>

            </td>
        </tr>
        ))}
    </tbody>
</table>
        )}

        <DeleteModal
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={confirmarDelete}
        />

    </div>
  )
}

export default Livros