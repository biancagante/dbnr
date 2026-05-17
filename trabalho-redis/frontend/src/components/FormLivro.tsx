import { useState } from 'react'

function FormLivro({ initialData = {}, onSubmit }: any) {

  const [formData, setFormData] = useState({
    titulo: initialData.titulo || '',
    autor: initialData.autor || '',
    categoria: initialData.categoria || '',
    ano_publicacao: initialData.ano_publicacao || '',
    quantidade_disponivel: initialData.quantidade_disponivel || '',
    status: initialData.status || 'Disponível'
  })

  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleStatusChange(value: string) {
    setFormData({
      ...formData,
      status: value
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (

    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
      }}
    >

      <input
        type="text"
        name="titulo"
        minLength={2}
        maxLength={150}
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="autor"
        minLength={2}
        maxLength={100}
        placeholder="Autor"
        value={formData.autor}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="categoria"
        minLength={2}
        maxLength={50}
        placeholder="Categoria"
        value={formData.categoria}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="ano_publicacao"
        placeholder="Ano de publicação"
        value={formData.ano_publicacao}
        onChange={handleChange}
        style={inputStyle}
        min={1}
      />

      <input
        type="number"
        name="quantidade_disponivel"
        placeholder="Quantidade disponível"
        value={formData.quantidade_disponivel}
        onChange={handleChange}
        min={1}
        style={inputStyle}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1vh',
        marginTop: '1vh',
      }}>

        <span style={{
          fontWeight: 'bold',
          color: '#333',
        }}>
          Status
        </span>

        <div style={{
          display: 'flex',
          gap: '2vh',
        }}>

          <label style={radioLabelStyle}>
            <input
              type="radio"
              checked={formData.status === 'Disponível'}
              onChange={() => handleStatusChange('Disponível')}
            />

            Disponível
          </label>

          <label style={radioLabelStyle}>
            <input
              type="radio"
              checked={formData.status === 'Emprestado'}
              onChange={() => handleStatusChange('Emprestado')}
            />

            Emprestado
          </label>

        </div>

      </div>

      <button
        type="submit"
        style={{
          marginTop: '2vh',
          padding: '14px',
          border: 'none',
          borderRadius: '10px',
          backgroundColor: '#011617',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: '0.2s',
        }}
      >
        Salvar Livro
      </button>

    </form>
  )
}

const inputStyle = {
  padding: '14px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '15px',
}

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.7vh',
  fontSize: '15px',
  color: '#444',
}

export default FormLivro