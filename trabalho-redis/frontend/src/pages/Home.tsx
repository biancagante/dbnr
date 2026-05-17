import { useState } from 'react'

import Header from '../components/Header'
import CadastroLivro from './CadastroLivro'
import Livros from './Livros'

function Home() {

  const [telaAtual, setTelaAtual] = useState('livros')
  const [animando, setAnimando] = useState(false)

  function trocarTela(tela: string) {

    if (tela === telaAtual) return

    setAnimando(true)

    setTimeout(() => {

      setTelaAtual(tela)

      setTimeout(() => {
        setAnimando(false)
      }, 50)

    }, 200)
  }

  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#f4fdff',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>

      <Header
        trocarTela={trocarTela}
        telaAtual={telaAtual}
      />

      <div style={{
        padding: '4vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>

        <div style={{
          width: '100%',
          padding: '4vh',
          minHeight: '90vh',
          backgroundColor: '#DAF9FC',
          borderRadius: '24px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',

          transition: '0.3s ease',
          opacity: animando ? 0 : 1,
          transform: animando
            ? 'translateY(15px)'
            : 'translateY(0px)',
        }}>

          <h1 style={{
            marginBottom: '3vh',
            color: '#1b1b1b',
            fontSize: '36px',
          }}>
            Sistema de gerenciamento de livros
          </h1>

          {
            telaAtual === 'livros'
              ? <Livros />
              : <CadastroLivro trocarTela={trocarTela} />
          }

        </div>

      </div>

    </div>
  )
}

export default Home