import { useState } from 'react'

export function useToast() {

  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error' | ''>('')

  function showToast(msg: string, t: 'success' | 'error') {
    setMessage(msg)
    setType(t)

    setTimeout(() => {setMessage(''), setType('')}, 2500)
  }

  const Toast = () => (
    message ? (
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        padding: 12,
        background: type === 'success' ? 'green' : 'red',
        color: 'white'
      }}>
        {message}
      </div>) : null
  )

  return { showToast, Toast }
}