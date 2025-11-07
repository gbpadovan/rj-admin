'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Phone, Mail, MapPin, Building2 } from 'lucide-react'

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  cnpj: string
  endereco: string
  cidade: string
  estado: string
  status: 'Ativo' | 'Inativo' | 'Pendente'
  postos: number
  dataRegistro: string
}

const clientesIniciais: Cliente[] = [
  {
    id: 1,
    nome: 'Posto Ipiranga Centro',
    email: 'contato@ipirangacentro.com.br',
    telefone: '(21) 3333-4444',
    cnpj: '12.345.678/0001-90',
    endereco: 'Av. Principal, 1000',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    status: 'Ativo',
    postos: 3,
    dataRegistro: '2024-01-15',
  },
  {
    id: 2,
    nome: 'Shell Express',
    email: 'admin@shellexpress.com.br',
    telefone: '(21) 2222-3333',
    cnpj: '23.456.789/0001-01',
    endereco: 'Rua Comercial, 500',
    cidade: 'Niterói',
    estado: 'RJ',
    status: 'Ativo',
    postos: 2,
    dataRegistro: '2024-02-20',
  },
  {
    id: 3,
    nome: 'BR Mania',
    email: 'contato@brmania.com.br',
    telefone: '(21) 4444-5555',
    cnpj: '34.567.890/0001-12',
    endereco: 'Rodovia BR-101, Km 15',
    cidade: 'São Gonçalo',
    estado: 'RJ',
    status: 'Ativo',
    postos: 5,
    dataRegistro: '2024-03-10',
  },
  {
    id: 4,
    nome: 'Petrobras Station',
    email: 'info@petrobrasstation.com.br',
    telefone: '(21) 5555-6666',
    cnpj: '45.678.901/0001-23',
    endereco: 'Av. Brasil, 2000',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    status: 'Pendente',
    postos: 1,
    dataRegistro: '2024-04-05',
  },
]

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    status: 'Ativo',
    postos: 0,
  })

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cnpj.includes(searchTerm)
  )

  const handleCreate = () => {
    setModalMode('create')
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      status: 'Ativo',
      postos: 0,
    })
    setShowModal(true)
  }

  const handleEdit = (cliente: Cliente) => {
    setModalMode('edit')
    setSelectedCliente(cliente)
    setFormData(cliente)
    setShowModal(true)
  }

  const handleView = (cliente: Cliente) => {
    setModalMode('view')
    setSelectedCliente(cliente)
    setFormData(cliente)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(clientes.filter((c) => c.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (modalMode === 'create') {
      const newCliente: Cliente = {
        ...formData as Cliente,
        id: Math.max(...clientes.map(c => c.id)) + 1,
        dataRegistro: new Date().toISOString().split('T')[0],
      }
      setClientes([...clientes, newCliente])
    } else if (modalMode === 'edit' && selectedCliente) {
      setClientes(clientes.map((c) => 
        c.id === selectedCliente.id ? { ...c, ...formData } : c
      ))
    }
    
    setShowModal(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-700'
      case 'Inativo':
        return 'bg-red-100 text-red-700'
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie os clientes do sistema de postos
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNPJ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Postos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                        <div className="text-sm text-gray-500">{cliente.dataRegistro}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.email}</div>
                    <div className="text-sm text-gray-500">{cliente.telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.cnpj}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.cidade}</div>
                    <div className="text-sm text-gray-500">{cliente.estado}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.postos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(cliente.status)}`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(cliente)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="text-primary-600 hover:text-primary-900 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Tente ajustar sua busca' : 'Comece criando um novo cliente'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'create' && 'Novo Cliente'}
                {modalMode === 'edit' && 'Editar Cliente'}
                {modalMode === 'view' && 'Detalhes do Cliente'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Postos
                  </label>
                  <input
                    type="number"
                    value={formData.postos}
                    onChange={(e) => setFormData({ ...formData, postos: parseInt(e.target.value) })}
                    disabled={modalMode === 'view'}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    disabled={modalMode === 'view'}
                    required
                    maxLength={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
                </button>
                {modalMode !== 'view' && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {modalMode === 'create' ? 'Criar Cliente' : 'Salvar Alterações'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
