import { useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://TU_PROYECTO.supabase.co'
const supabaseKey = 'TU_API_KEY_SECRETA'
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [form, setForm] = useState({
    empresa: '',
    contacto: '',
    telefono: '',
    registro: '',
    fecha: '',
    elaborado_por: '',
    revisado_por: ''
  })

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.from('solicitudes').insert([form])
    if (error) {
      console.error(error)
      setMensaje('Error al guardar')
    } else {
      setMensaje('¡Solicitud enviada exitosamente!')
      setForm({ empresa: '', contacto: '', telefono: '', registro: '', fecha: '', elaborado_por: '', revisado_por: '' })
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Solicitud de Servicio</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {['empresa', 'contacto', 'telefono', 'registro', 'fecha', 'elaborado_por', 'revisado_por'].map((field) => (
          <input
            key={field}
            type={field === 'fecha' ? 'date' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace(/_/g, ' ').toUpperCase()}
            className="border p-2 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Enviar Solicitud</button>
        {mensaje && <p className="text-green-600 font-semibold">{mensaje}</p>}
      </form>
    </div>
  )
}

export default App
