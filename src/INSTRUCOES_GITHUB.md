# 📋 Instruções para Subir o Código no GitHub

## Passo a Passo Completo

### 1. Preparar o Ambiente Local

Primeiro, certifique-se de que você tem o Git instalado:

\`\`\`bash
git --version
\`\`\`

Se não tiver, baixe em: https://git-scm.com/downloads

### 2. Copiar os Arquivos do Projeto

Copie todos os arquivos deste projeto para uma pasta local no seu computador. A estrutura deve ficar assim:

\`\`\`
attendance_list/
├── components/
├── lib/
├── App.tsx
├── package.json
├── supabase-setup.sql
├── README.md
├── .gitignore
└── INSTRUCOES_GITHUB.md (este arquivo)
\`\`\`

### 3. Inicializar o Repositório Git

Abra o terminal/prompt de comando na pasta do projeto e execute:

\`\`\`bash
# Inicializa o repositório Git
git init

# Adiciona todos os arquivos
git add .

# Faz o primeiro commit
git commit -m "Primeiro commit: Sistema de Registro Biométrico"
\`\`\`

### 4. Conectar ao Repositório GitHub

\`\`\`bash
# Adiciona o repositório remoto
git remote add origin https://github.com/vfalves/attendance_list.git

# Renomeia a branch para main (se necessário)
git branch -M main

# Envia o código para o GitHub
git push -u origin main
\`\`\`

### 5. Configurar o Supabase

#### 5.1. Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Faça login ou crie uma conta gratuita
3. Clique em "New Project"
4. Preencha:
   - **Nome do projeto**: attendance-list
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima (South America - São Paulo)
5. Clique em "Create new project" e aguarde a criação (2-3 minutos)

#### 5.2. Executar o Script SQL

1. No painel do Supabase, no menu lateral, clique em **SQL Editor**
2. Clique em "+ New query"
3. Copie todo o conteúdo do arquivo `supabase-setup.sql` do projeto
4. Cole no editor SQL
5. Clique em "Run" (ou pressione Ctrl+Enter)
6. Você verá a mensagem "Success. No rows returned"

Isso criou as 3 tabelas necessárias:
- ✅ professionals
- ✅ meetings  
- ✅ attendances

#### 5.3. Obter as Credenciais

1. No menu lateral, clique em **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Você verá duas informações importantes:

**Project URL** (exemplo):
\`\`\`
https://xxxxxxxxxxx.supabase.co
\`\`\`

**anon/public key** (exemplo):
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
\`\`\`

4. **COPIE E GUARDE** essas duas informações!

### 6. Configurar Variáveis de Ambiente Localmente

Na pasta do projeto, crie um arquivo chamado `.env`:

\`\`\`bash
# No Windows (PowerShell)
New-Item .env

# No Mac/Linux
touch .env
\`\`\`

Abra o arquivo `.env` e adicione:

\`\`\`env
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
\`\`\`

**Exemplo real:**
\`\`\`env
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
\`\`\`

⚠️ **IMPORTANTE**: O arquivo `.env` NÃO será enviado para o GitHub (está no .gitignore)

### 7. Testar Localmente

\`\`\`bash
# Instalar dependências
npm install

# Executar o projeto
npm run dev
\`\`\`

Acesse: http://localhost:5173

Teste as funcionalidades:
1. Cadastrar um profissional
2. Criar uma lista de presença
3. Registrar presença
4. Finalizar e gerar PDF

### 8. Deploy na Vercel (Opcional mas Recomendado)

#### 8.1. Criar Conta na Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize a Vercel a acessar seu GitHub

#### 8.2. Importar o Projeto

1. No dashboard da Vercel, clique em "Add New..."
2. Clique em "Project"
3. Encontre o repositório "attendance_list"
4. Clique em "Import"

#### 8.3. Configurar Variáveis de Ambiente

1. Antes de fazer o deploy, clique em "Environment Variables"
2. Adicione as duas variáveis:

**Variável 1:**
- Name: \`VITE_SUPABASE_URL\`
- Value: Cole a URL do Supabase

**Variável 2:**
- Name: \`VITE_SUPABASE_ANON_KEY\`
- Value: Cole a chave anon do Supabase

3. Clique em "Deploy"

#### 8.4. Aguardar o Deploy

- O deploy leva cerca de 1-2 minutos
- Você receberá uma URL tipo: `https://attendance-list.vercel.app`
- Pronto! Seu aplicativo está online! 🎉

## 🔄 Atualizar o Código no Futuro

Sempre que fizer alterações no código:

\`\`\`bash
# Adiciona as mudanças
git add .

# Faz o commit
git commit -m "Descrição das mudanças"

# Envia para o GitHub
git push
\`\`\`

Se estiver usando Vercel, o deploy é **automático** após o push!

## ✅ Checklist Final

Antes de considerar tudo pronto, verifique:

- [ ] Código está no GitHub
- [ ] Projeto Supabase criado
- [ ] Tabelas criadas no Supabase (via SQL)
- [ ] Variáveis de ambiente configuradas localmente
- [ ] Projeto funciona localmente (npm run dev)
- [ ] (Opcional) Deploy na Vercel realizado
- [ ] (Opcional) Variáveis de ambiente configuradas na Vercel
- [ ] Testes básicos funcionando:
  - [ ] Cadastro de profissional
  - [ ] Verificação de duplicata
  - [ ] Criação de lista de presença
  - [ ] Registro de presença
  - [ ] Exportação de PDF

## 🆘 Problemas Comuns

### "git: command not found"
- Instale o Git: https://git-scm.com/downloads

### "remote: Repository not found"
- Verifique se você tem acesso ao repositório
- Confirme se a URL está correta: https://github.com/vfalves/attendance_list.git

### "Cannot connect to Supabase"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que não há espaços extras nas URLs/chaves
- Verifique se o projeto Supabase está ativo

### Aplicativo não conecta ao banco
- Verifique se as tabelas foram criadas (execute o SQL novamente)
- Confirme que as políticas de RLS estão configuradas (estão no SQL)

## 📞 Suporte

Se tiver problemas:
1. Verifique as mensagens de erro no console do navegador (F12)
2. Verifique os logs do Supabase
3. Abra uma issue no GitHub: https://github.com/vfalves/attendance_list/issues

---

**Boa sorte com o projeto! 🚀**
