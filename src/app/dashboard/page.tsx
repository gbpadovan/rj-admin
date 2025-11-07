'use client'

import { Users, Fuel, TrendingUp, DollarSign } from 'lucide-react'

const stats = [
  {
    name: 'Total de Clientes',
    value: '248',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Postos Ativos',
    value: '42',
    change: '+3',
    changeType: 'positive',
    icon: Fuel,
  },
  {
    name: 'Faturamento Mensal',
    value: 'R$ 1.2M',
    change: '+8%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    name: 'Taxa de Crescimento',
    value: '15.3%',
    change: '+2.1%',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Visão geral do sistema de automação de postos
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-primary-50`}>
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.name}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Clientes Recentes
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Posto Ipiranga Centro', date: 'Há 2 horas', status: 'Ativo' },
              { name: 'Shell Express', date: 'Há 5 horas', status: 'Ativo' },
              { name: 'BR Mania', date: 'Há 1 dia', status: 'Ativo' },
              { name: 'Petrobras Station', date: 'Há 2 dias', status: 'Pendente' },
            ].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.date}</p>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    client.status === 'Ativo'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status do Sistema
          </h2>
          <div className="space-y-4">
            {[
              { name: 'API Principal', status: 'Operacional', uptime: '99.9%' },
              { name: 'Banco de Dados', status: 'Operacional', uptime: '100%' },
              { name: 'Sistema de Pagamentos', status: 'Operacional', uptime: '99.8%' },
              { name: 'Backup Automático', status: 'Operacional', uptime: '100%' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.status}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {service.uptime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
