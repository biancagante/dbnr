import FormLivro from '../components/FormLivro'
import api from '../services/api'
import { useToast } from '../components/toast'

type Props = {
  trocarTela: (tela: string) => void
}

function CadastroLivro({ trocarTela }: Props) {

  const { showToast, Toast } = useToast()

  async function criarLivro(data: any) {

    try {

      await api.post('/livros/adicionar', data)

      showToast('Livro cadastrado com sucesso!', 'success')

      setTimeout(() => {
        trocarTela('livros')
      }, 1500)

    } catch (error) {

      showToast('Erro ao cadastrar livro', 'error')

    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '80vh',
    }}>

      <Toast />

      <div style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '18px',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
      }}>

        <div style={{
          marginBottom: '3vh',
        }}>

          <h1 style={{
            margin: 0,
            fontSize: '32px',
            color: '#222',
          }}>
            Cadastrar Livro
          </h1>

          <p style={{
            marginTop: '1vh',
            color: '#666',
            fontSize: '16px',
          }}>
            Preencha os dados abaixo para adicionar um novo livro ao sistema.
          </p>

        </div>

        <FormLivro onSubmit={criarLivro} />

      </div>

    </div>
  )
}

export default CadastroLivro