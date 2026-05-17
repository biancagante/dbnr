import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import FormLivro from '../components/FormLivro'
import { useToast } from '../components/toast'

function EditarLivro() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [livro, setLivro] = useState<any>(null)

  const [saindo, setSaindo] = useState(false)
  const [entrando, setEntrando] = useState(true)

  const { showToast, Toast } = useToast()

  async function carregarLivro() {

    try {

      const response = await api.get(`/livros/${id}`)

      setLivro(response.data)

      setTimeout(() => {
        setEntrando(false)
      }, 50)

    } catch (error) {

      showToast('Erro ao carregar livro', 'error')

    }
  }

  async function atualizarLivro(data: any) {

    try {

      await api.put(`/livros/${id}`, data)

      showToast('Livro atualizado com sucesso!', 'success')

      setTimeout(() => {

        setSaindo(true)

        setTimeout(() => {
          navigate('/')
        }, 300)

      }, 1200)

    } catch (error) {

      showToast('Erro ao atualizar livro', 'error')

    }
  }

  function voltar() {

    setSaindo(true)

    setTimeout(() => {
      navigate('/')
    }, 300)
  }

  useEffect(() => {
    carregarLivro()
  }, [])

  if (!livro) {

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#555',
      }}>
        Carregando livro...
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f4fdff',
      padding: '4vh',

      transition: '0.3s ease',

      opacity:
        saindo
          ? 0
          : entrando
            ? 0
            : 1,

      transform:
        saindo
          ? 'translateY(20px)'
          : entrando
            ? 'translateY(20px)'
            : 'translateY(0px)',
    }}>

      <Toast />

      <div style={{
        width: '100%',
        maxWidth: '750px',
        backgroundColor: '#DAF9FC',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
      }}>

        <button
          onClick={voltar}
          style={{
            border: 'none',
            backgroundColor: '#00b7d6',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '3vh',
            transition: '0.2s',
          }}
        >
          ← Voltar
        </button>

        <div style={{
          marginBottom: '3vh',
        }}>

          <h1 style={{
            margin: 0,
            fontSize: '34px',
            color: '#1b1b1b',
          }}>
            Editar Livro
          </h1>

          <p style={{
            marginTop: '1vh',
            color: '#555',
            fontSize: '16px',
          }}>
            Atualize as informações do livro selecionado.
          </p>

        </div>

        <FormLivro
          initialData={livro}
          onSubmit={atualizarLivro}
        />

      </div>

    </div>
  )
}

export default EditarLivro