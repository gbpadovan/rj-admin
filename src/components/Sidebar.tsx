'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Fuel, Users, LayoutDashboard, Settings, LogOut, BarChart3, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', href: '/dashboard/clientes', icon: Users },
  { name: 'Postos', href: '/dashboard/postos', icon: Fuel },
  { name: 'Relatórios', href: '/dashboard/relatorios', icon: FileText },
  { name: 'Análises', href: '/dashboard/analises', icon: BarChart3 },
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="bg-primary-600 p-2 rounded-lg">
          <Fuel className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
          <p className="text-xs text-gray-500">Sistema de Postos</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-medium text-primary-700">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Administrador</p>
            <p className="text-xs text-gray-500 truncate">admin@sistema.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  )
}
