# 🔧 Soluções para Problemas Comuns

## 🔨 "Error: Command npm run build exited with 1"

### ❌ Problema
O build está falando durante o deploy na Vercel/Netlify/GitHub Pages.

### ✅ Solução
Leia o arquivo **FIX_BUILD_ERROR.md** - Já criei todos os arquivos necessários!

**Resumo rápido:**
```bash
# 1. Fazer commit dos novos arquivos
git add .
git commit -m "Fix: Adicionar configuração do Vite"
git push

# 2. O deploy será automático!
```

Os arquivos essenciais já foram criados:
- ✅ index.html
- ✅ vite.config.ts
- ✅ tsconfig.json
- ✅ src/main.tsx

---

## 🤔 "Cliquei no GitHub mas o site não abre"

### ❌ Problema
Você acessou `https://github.com/vfalves/attendance_list` e não vê o site funcionando.

### ✅ Solução
**O GitHub NÃO hospeda sites automaticamente!**

GitHub = Código fonte (como um arquivo ZIP)  
Site funcionando = Precisa de hospedagem

**O que fazer:**
1. Leia o arquivo **INICIO_RAPIDO.md**
2. Faça o deploy na Vercel (5 minutos)
3. Seu site estará no ar!

---

## 🌐 "Site abre mas mostra erro de conexão"

### ❌ Problema
```
⚠️ Variáveis de ambiente do Supabase não configuradas
```

### ✅ Solução
Você esqueceu de configurar as variáveis de ambiente!

**Na Vercel:**
1. Vá no seu projeto
2. Clique em **Settings**
3. Clique em **Environment Variables**
4. Adicione:
   - `VITE_SUPABASE_URL` = sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = sua chave do Supabase
5. Vá em **Deployments**
6. Clique nos 3 pontinhos do último deploy
7. Clique em **Redeploy**

**Na Netlify:**
1. Vá em **Site settings**
2. **Environment variables**
3. Adicione as 2 variáveis
4. Vá em **Deploys**
5. Clique em **Trigger deploy** → **Deploy site**

---

## 📝 "Não sei onde pegar as credenciais do Supabase"

### ✅ Passo a Passo

1. **Acesse:** https://supabase.com
2. **Faça login**
3. **Abra seu projeto** (attendance-list)
4. **No menu lateral:** Settings ⚙️
5. **Clique em:** API
6. **Você verá:**

```
┌────────────────────────────────────────────┐
│ Configuration                               │
├────────────────────────────────────────────┤
│ Project URL:                               │
│ https://xxxxxxxxxxx.supabase.co            │ ← COPIE ISSO
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ Project API keys                            │
├────────────────────────────────────────────┤
│ anon public                                │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   │ ← COPIE ISSO
└────────────────────────────────────────────┘
```

---

## 🗃️ "Não criei o banco de dados ainda"

### ✅ Criar Projeto Supabase

**Tempo: 3 minutos**

1. **Acesse:** https://supabase.com
2. **Clique:** "Sign up" (pode usar GitHub)
3. **Clique:** "New Project"
4. **Preencha:**
   ```
   Name: attendance-list
   Database Password: [crie senha forte]
   Region: South America (São Paulo)
   ```
5. **Clique:** "Create new project"
6. **Aguarde:** 2-3 minutos

### ✅ Criar as Tabelas

**Tempo: 1 minuto**

1. **No Supabase, menu lateral:** SQL Editor
2. **Clique:** "+ New query"
3. **Abra o arquivo:** `supabase-setup.sql` do projeto
4. **Copie TODO o conteúdo**
5. **Cole no editor SQL**
6. **Clique:** "Run" (ou Ctrl+Enter)
7. **Deve aparecer:** "Success. No rows returned"

✅ Pronto! Tabelas criadas:
- professionals
- meetings
- attendances

---

## 🚫 "git: command not found"

### ✅ Solução
Você não tem o Git instalado.

**Instalar Git:**

**Windows:**
1. Baixe: https://git-scm.com/download/win
2. Execute o instalador
3. Use as opções padrão
4. Reinicie o terminal

**Mac:**
```bash
# Instalar via Homebrew
brew install git

# Ou instalar Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt-get install git

# Fedora
sudo dnf install git
```

---

## 📦 "npm: command not found"

### ✅ Solução
Você precisa instalar o Node.js (que inclui o npm).

**Instalar Node.js:**

1. **Acesse:** https://nodejs.org
2. **Baixe a versão LTS** (recomendada)
3. **Execute o instalador**
4. **Reinicie o terminal**
5. **Teste:**
   ```bash
   node --version
   npm --version
   ```

---

## 🔐 "Permission denied" ao fazer git push

### ✅ Solução
Você precisa autenticar o Git com o GitHub.

**Opção 1: HTTPS (mais fácil)**
```bash
# Configure seu nome
git config --global user.name "Seu Nome"

# Configure seu email
git config --global user.email "seu@email.com"

# No primeiro push, vai pedir usuário e senha
# Use um Personal Access Token como senha
```

**Criar Personal Access Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Marque: `repo`
5. Copie o token
6. Use como senha no git push

**Opção 2: SSH**
```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu@email.com"

# Adicionar ao ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Adicionar ao GitHub
# Copie a chave pública
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH keys → New SSH key
# Cole a chave
```

---

## 🔄 "Build failed" na Vercel/Netlify

### ❌ Erro comum:
```
Error: Cannot find module 'react'
```

### ✅ Solução
Problema com as dependências.

**Localmente:**
```bash
# Deletar node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Instalar novamente
npm install

# Fazer commit
git add .
git commit -m "Fix dependencies"
git push
```

A Vercel vai detectar e fazer deploy automaticamente.

---

## 📄 "404 quando recarrego a página"

### ✅ Solução
O arquivo `vercel.json` resolve isso!

Certifique-se que existe o arquivo `/vercel.json` com:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Este arquivo já está incluído no projeto!

---

## 🎨 "Erro de CSS/estilos não aparecem"

### ✅ Solução

Verifique se existe o arquivo `/styles/globals.css`

Se não existir, o arquivo deve conter os estilos do Tailwind.

---

## 💾 "Dados não salvam no banco"

### ❌ Possíveis causas:

**1. Variáveis de ambiente erradas**
- Verifique se você copiou corretamente
- Não pode ter espaços extras
- Deve ser a URL e chave do projeto correto

**2. Tabelas não foram criadas**
- Execute o `supabase-setup.sql` novamente

**3. RLS (Row Level Security) muito restritivo**
- O SQL já configura as políticas corretas
- Se mudou algo, revise as políticas

**Teste a conexão:**
```javascript
// Adicione no código temporariamente
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key existe:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

---

## 🔍 Como Ver Logs de Erro

### Na Vercel:
1. Vá no projeto
2. Clique em **Deployments**
3. Clique no último deploy
4. Veja os **Build Logs**

### Na Netlify:
1. Vá no site
2. Clique em **Deploys**
3. Clique no último deploy
4. Veja o **Deploy log**

### No Navegador:
1. Abra o site
2. Pressione **F12**
3. Vá na aba **Console**
4. Veja os erros em vermelho

---

## 📞 Ainda com Problemas?

Se nenhuma solução funcionou:

1. **Abra uma issue no GitHub:**
   https://github.com/vfalves/attendance_list/issues

2. **Inclua:**
   - Descrição do problema
   - Print da tela de erro
   - Logs do console (F12)
   - O que você já tentou

3. **Documentos úteis:**
   - INICIO_RAPIDO.md
   - DEPLOY.md
   - INSTRUCOES_GITHUB.md
   - README.md

---

**Boa sorte! 🍀**