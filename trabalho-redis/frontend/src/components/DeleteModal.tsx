function DeleteModal({ open, onClose, onConfirm }: any) {

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: 'translate(-10%, -5%)',


      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      opacity: open ? 1 : 0,
      pointerEvents: open ? 'all' : 'none',

      transition: '0.25s ease',
      zIndex: 999,
    }}>

      <div style={{
        background: '#fff',
        padding: '35px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',

        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',

        transform: open
          ? 'scale(1)'
          : 'scale(0.85)',

        opacity: open ? 1 : 0,

        transition: '0.25s ease',
      }}>

        <h2 style={{
          marginTop: 0,
          color: '#222',
        }}>
          Confirmar exclusão
        </h2>

        <p style={{
          color: '#555',
          marginBottom: '3vh',
        }}>
          Deseja realmente excluir este livro?
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1vh',
        }}>

          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#e9ecef',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: '10px 18px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#dc3545',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Excluir
          </button>

        </div>

      </div>

    </div>
  )
}

export default DeleteModal