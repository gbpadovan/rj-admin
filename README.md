# Portal Administrativo - Sistema de Postos de Gasolina

Portal administrativo moderno desenvolvido com React, Next.js, TypeScript e Tailwind CSS para gerenciamento de clientes de sistemas de automação de postos de gasolina.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones modernos
- **React Hooks** - Gerenciamento de estado

## 📋 Funcionalidades

### ✅ Tela de Login
- Interface moderna e responsiva
- Validação de formulário
- Animação de loading
- Autenticação simulada com localStorage

### ✅ Dashboard Administrativo
- Visão geral com métricas principais
- Cards de estatísticas (clientes, postos, faturamento)
- Listagem de clientes recentes
- Status do sistema em tempo real
- Navegação lateral com menu

### ✅ Gerenciamento de Clientes
- **Listagem** - Tabela completa com todos os dados dos clientes
- **Busca** - Filtro por nome, email ou CNPJ
- **Criar** - Formulário para adicionar novos clientes
- **Editar** - Atualização de dados existentes
- **Visualizar** - Detalhes completos do cliente
- **Excluir** - Remoção com confirmação

## 🎨 Design

- Interface moderna com gradientes e sombras suaves
- Paleta de cores azul (primary) profissional
- Componentes com hover states e transições
- Layout responsivo para desktop e mobile
- Ícones Lucide React integrados

## 📦 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em desenvolvimento:**
```bash
npm run dev
```

3. **Acessar o sistema:**
```
http://localhost:3000
```

## 🔐 Acesso ao Sistema

Para fazer login, use qualquer email e senha. O sistema possui autenticação simulada para demonstração.

**Exemplo:**
- Email: `admin@sistema.com`
- Senha: `qualquer senha`

## 📁 Estrutura do Projeto

```
rj-admin/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── clientes/
│   │   │   │   └── page.tsx          # Página de gerenciamento de clientes
│   │   │   ├── layout.tsx            # Layout do dashboard
│   │   │   └── page.tsx              # Dashboard principal
│   │   ├── globals.css               # Estilos globais
│   │   ├── layout.tsx                # Layout raiz
│   │   └── page.tsx                  # Página de login
│   ├── components/
│   │   └── Sidebar.tsx               # Componente de navegação lateral
│   └── lib/
│       └── utils.ts                  # Utilitários (cn helper)
├── public/                           # Arquivos estáticos
├── package.json                      # Dependências
├── tsconfig.json                     # Configuração TypeScript
├── tailwind.config.ts                # Configuração Tailwind
└── next.config.js                    # Configuração Next.js
```

## 🎯 Rotas

- `/` - Tela de login
- `/dashboard` - Dashboard principal
- `/dashboard/clientes` - Gerenciamento de clientes
- `/dashboard/postos` - Gerenciamento de postos (em desenvolvimento)
- `/dashboard/relatorios` - Relatórios (em desenvolvimento)
- `/dashboard/analises` - Análises (em desenvolvimento)
- `/dashboard/configuracoes` - Configurações (em desenvolvimento)

## 🔧 Próximos Passos

Para expandir o sistema, considere:

1. **Backend Integration**
   - Conectar com API REST ou GraphQL
   - Implementar autenticação JWT real
   - Persistência de dados em banco

2. **Funcionalidades Adicionais**
   - Gerenciamento de postos
   - Sistema de relatórios
   - Dashboard de análises
   - Configurações de usuário
   - Upload de imagens

3. **Melhorias**
   - Testes unitários e E2E
   - Validação de formulários com Zod
   - Paginação na listagem
   - Filtros avançados
   - Exportação de dados (CSV, PDF)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## 🤝 Contribuindo

Este é um projeto de demonstração. Para uso em produção, implemente:
- Autenticação real com backend
- Validação de dados no servidor
- Tratamento de erros robusto
- Testes automatizados
- Logs e monitoramento

## 📄 Licença

Este projeto foi desenvolvido para fins demonstrativos.

---

Desenvolvido com ❤️ usando Next.js e Tailwind CSS
