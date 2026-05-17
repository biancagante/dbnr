type Props = {
  trocarTela: (tela: string) => void
  telaAtual: string
}

function Header({ trocarTela, telaAtual }: Props) {

  function buttonStyle(ativo: boolean) {

    return {
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      textAlign: 'left' as const,

      padding: '16px',
      borderRadius: '14px',

      transition: '0.25s ease',

      backgroundColor: ativo
        ? '#00b7d6'
        : 'transparent',

      color: ativo
        ? '#fff'
        : '#222',

      fontWeight: ativo
        ? 'bold'
        : '500',

      transform: ativo
        ? 'scale(1.03)'
        : 'scale(1)',

      boxShadow: ativo
        ? '0px 4px 12px rgba(0,0,0,0.12)'
        : 'none',
    }
  }

  return (
    <div style={{
      width: '20%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4vh',
      backgroundColor: '#DAF9FC',
      minHeight: '100vh',
      gap: '3vh',
      boxShadow:'1px 0px 10px 0px rgba(0,0,0,0.15)',
      position: 'relative',
    }}>

      <h1 style={{
        margin: 0,
        fontSize: '34px',
        color: '#1b1b1b',
      }}>
        Biblioteca Digital
      </h1>

      <nav style={{
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '1.5vh',
        marginTop: '2vh',
      }}>

        <button
          onClick={() => trocarTela('livros')}
          style={buttonStyle(telaAtual === 'livros')}
        >
          📚 Ver livros
        </button>

        <button
          onClick={() => trocarTela('cadastro')}
          style={buttonStyle(telaAtual === 'cadastro')}
        >
          ➕ Cadastrar livro
        </button>

      </nav>

      <hr style={{
        transform: 'rotate(90deg)',
        position: 'fixed',
        right: '33.5%',
        width: '100%',
        borderWidth: '2px medium medium',
        borderStyle: 'dotted none none',
        borderColor: '#00b7d6 currentcolor currentcolor',
        border: 'none',
        borderTop: '3px dotted #00b7d6',
        opacity: 0.8,
      }}/>

    </div>
  )
}

export default Header