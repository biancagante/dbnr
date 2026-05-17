import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Livros from '../pages/Livros'
import CadastroLivro from '../pages/CadastroLivro'
import EditarLivro from '../pages/EditarLivro'
import NotFound from '../pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/livros" element={<Livros />} />
      <Route path="/cadastro" element={<CadastroLivro />} />
      <Route path="/editar/:id" element={<EditarLivro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes