# Sistema de Registro Biométrico de Presença

Sistema completo para registro de presença com autenticação por digital (simulada), desenvolvido com React, TypeScript, Tailwind CSS e Supabase.

---

## 🚨 ATENÇÃO: Erro de Build?

Se você teve o erro **"npm run build exited with 1"**, ele foi **CORRIGIDO**! ✅

**👉 Leia o arquivo [COMECE_AQUI.md](./COMECE_AQUI.md) para solução rápida!**

Execute este comando único:
```bash
git add . && git commit -m "Fix: Adicionar configuração do Vite" && git push
```

---

## 🚀 Repositório GitHub

Este projeto está hospedado em: https://github.com/vfalves/attendance_list

## ⚠️ IMPORTANTE: Como Colocar o Site no Ar

**O GitHub apenas armazena o código-fonte!** Para o site funcionar na internet, você precisa fazer **DEPLOY** em uma plataforma de hospedagem.

### 📚 Guias Rápidos:
- 📖 **[COMECE_AQUI.md](./COMECE_AQUI.md)** - COMECE POR AQUI!
- ⚡ **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Deploy em 5 minutos
- 🚀 **[DEPLOY.md](./DEPLOY.md)** - Instruções completas
- 🔧 **[PROBLEMAS_COMUNS.md](./PROBLEMAS_COMUNS.md)** - Soluções para erros
- 📋 **[COMANDOS_RAPIDOS.md](./COMANDOS_RAPIDOS.md)** - Comandos úteis

### 👉 Leia o arquivo [DEPLOY.md](./DEPLOY.md) para instruções completas!

**Opções de hospedagem gratuita:**
- ✅ **Vercel** (Recomendado) - Deploy em 5 minutos
- ✅ **Netlify** - Alternativa excelente
- ⚠️ **GitHub Pages** - Requer configuração adicional

## 📋 Funcionalidades

- ✅ Cadastro de profissionais com simulação de leitura biométrica
- ✅ Verificação automática de duplicatas por digital
- ✅ Criação de listas de presença para reuniões/cursos
- ✅ Check-in automático via leitura de digital
- ✅ Cronômetro em tempo real da reunião
- ✅ Exportação da lista de presença em PDF
- ✅ Armazenamento persistente no Supabase

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Supabase (Backend/Database)
- jsPDF (Geração de PDF)
- date-fns (Manipulação de datas)
- Lucide React (Ícones)

## 📦 Instalação e Configuração

### 1. Clone o Repositório

\`\`\`bash
git clone https://github.com/vfalves/attendance_list.git
cd attendance_list
\`\`\`

### 2. Instale as Dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure o Supabase

#### 3.1. Crie uma conta no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto

#### 3.2. Configure o Banco de Dados
1. No painel do Supabase, vá em **SQL Editor**
2. Copie o conteúdo do arquivo `/supabase-setup.sql` deste projeto
3. Cole no editor SQL e execute
4. Isso criará as tabelas: `professionals`, `meetings` e `attendances`

#### 3.3. Configure as Variáveis de Ambiente
1. No painel do Supabase, vá em **Settings** > **API**
2. Copie a **URL** e a **anon/public key**
3. Crie um arquivo `.env` na raiz do projeto:

\`\`\`env
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
\`\`\`

### 4. Execute o Projeto

\`\`\`bash
npm run dev
\`\`\`

O aplicativo estará disponível em `http://localhost:5173`

## 📊 Estrutura do Banco de Dados

### Tabela: professionals
Armazena os dados dos profissionais cadastrados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| nome_completo | TEXT | Nome completo do profissional |
| email_corporativo | TEXT | Email corporativo |
| funcao | TEXT | Função/cargo |
| empresa | TEXT | Nome da empresa |
| fingerprint_hash | TEXT | Hash da digital (único) |
| created_at | TIMESTAMP | Data de criação |

### Tabela: meetings
Armazena as informações das reuniões/cursos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| nome_instalacao | TEXT | Nome da instalação |
| data_reuniao | DATE | Data da reunião |
| hora_reuniao | TIME | Hora da reunião |
| duracao_sessao | TEXT | Duração calculada |
| titulo_curso | TEXT | Título do curso |
| conteudo_curso | TEXT | Conteúdo do curso |
| nome_instrutor | TEXT | Nome do instrutor |
| funcao_instrutor | TEXT | Função do instrutor |
| assinatura_instrutor | TEXT | Assinatura do instrutor |
| qualificacao_instrutor | TEXT | Qualificação do instrutor |
| inicio_reuniao | TIMESTAMP | Hora de início |
| fim_reuniao | TIMESTAMP | Hora de término |
| status | TEXT | Status (em_andamento/concluida) |
| created_at | TIMESTAMP | Data de criação |

### Tabela: attendances
Registra a presença dos profissionais nas reuniões.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | Identificador único |
| meeting_id | UUID | ID da reunião (FK) |
| professional_id | UUID | ID do profissional (FK) |
| numero_linha | INTEGER | Número sequencial na lista |
| data_hora_assinatura | TIMESTAMP | Data/hora do check-in |
| created_at | TIMESTAMP | Data de criação |

## 🔐 Segurança e Compliance

⚠️ **IMPORTANTE**: Este é um protótipo para demonstração. Para uso em produção com dados biométricos reais:

1. **Criptografia**: Implemente criptografia de ponta a ponta para dados biométricos
2. **LGPD/GDPR**: Garanta conformidade com leis de proteção de dados
3. **Consentimento**: Obtenha consentimento explícito dos usuários
4. **Auditoria**: Implemente logs de auditoria para acesso aos dados
5. **Backup**: Configure backups automáticos e seguros
6. **Acesso**: Configure Row Level Security (RLS) no Supabase adequadamente

## 📱 Como Usar

### Cadastrar Profissional
1. Clique em "Cadastrar Profissional"
2. Preencha os dados: nome, email, função e empresa
3. Clique em "Continuar para Escaneamento"
4. Clique em "Escanear Digital" (simulação de 2 segundos)
5. Sistema verifica se a digital já existe
6. Se nova, cadastro é concluído com sucesso

### Criar Lista de Presença
1. Clique em "Nova Lista de Presença"
2. Preencha informações da reunião:
   - Nome da instalação
   - Data e hora
   - Título e conteúdo do curso
   - Dados do instrutor
3. Clique em "Iniciar Reunião e Registro de Presença"

### Registrar Presença
1. Na tela da reunião, cada participante deve:
   - Clicar em "Escanear Digital"
   - Aguardar a simulação de leitura (2 segundos)
2. O sistema automaticamente:
   - Identifica o profissional pela digital
   - Registra data/hora da assinatura
   - Adiciona à lista de presença
   - Previne duplicatas

### Finalizar e Exportar
1. Clique em "Fim de Reunião e Gerar PDF"
2. O sistema calcula a duração automaticamente
3. Visualize o resumo da reunião
4. Clique em "Baixar PDF" para exportar a lista formatada

## 🔄 Deploy

### Vercel (Recomendado)
1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente no Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy automático!

### Netlify
1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Deploy automático!

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Estrutura de Arquivos

\`\`\`
attendance_list/
├── components/
│   ├── attendance-tracking.tsx    # Tela de registro de presença
│   ├── fingerprint-scanner.tsx    # Componente de scanner
│   ├── meeting-form.tsx           # Formulário de reunião
│   ├── pdf-generator.tsx          # Gerador de PDF
│   └── professional-registration.tsx  # Cadastro de profissionais
├── lib/
│   ├── fingerprint-simulator.ts   # Simulador de leitura biométrica
│   └── supabase.ts                # Cliente Supabase
├── styles/
│   └── globals.css                # Estilos globais
├── App.tsx                        # Componente principal
├── package.json                   # Dependências
├── supabase-setup.sql            # Script SQL de setup
└── README.md                      # Este arquivo
\`\`\`

## 📄 Licença

MIT License - Veja o arquivo LICENSE para detalhes

## 👨‍💻 Autor

**vfalves**

- GitHub: [@vfalves](https://github.com/vfalves)
- Repositório: [attendance_list](https://github.com/vfalves/attendance_list)

## 🐛 Reportar Bugs

Encontrou um bug? Por favor, abra uma [issue](https://github.com/vfalves/attendance_list/issues) no GitHub.

## 📮 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do repositório.

---

**Nota**: Este sistema simula a leitura de digitais pois navegadores web não têm acesso direto a leitores biométricos por questões de segurança. Em um ambiente de produção real, seria necessário desenvolver um aplicativo nativo (iOS/Android) com acesso aos sensores biométricos do dispositivo.