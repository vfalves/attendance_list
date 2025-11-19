# ✅ Checklist de Deploy

Use este checklist para garantir que tudo está configurado corretamente!

---

## 📋 Pré-requisitos

### Instalações Locais
- [ ] Git instalado (`git --version`)
- [ ] Node.js instalado (`node --version`)
- [ ] NPM instalado (`npm --version`)
- [ ] Editor de código (VSCode, etc.)

### Contas Online
- [ ] Conta no GitHub criada
- [ ] Conta no Supabase criada
- [ ] Conta na Vercel/Netlify criada (escolha uma)

---

## 🗄️ Configuração do Supabase

### Criar Projeto
- [ ] Acessei https://supabase.com
- [ ] Criei novo projeto "attendance-list"
- [ ] Escolhi região South America (São Paulo)
- [ ] Projeto criado com sucesso (aguardei 2-3 min)

### Criar Tabelas
- [ ] Abri SQL Editor no Supabase
- [ ] Copiei conteúdo do arquivo `supabase-setup.sql`
- [ ] Colei no editor SQL
- [ ] Executei o SQL (Run)
- [ ] Vi mensagem "Success. No rows returned"
- [ ] Tabelas criadas: `professionals`, `meetings`, `attendances`

### Obter Credenciais
- [ ] Fui em Settings → API
- [ ] Copiei **Project URL**
- [ ] Copiei **anon public key**
- [ ] Salvei essas informações (vou precisar!)

---

## 💻 Configuração Local

### Arquivos do Projeto
- [ ] Todos os arquivos estão presentes:
  - [ ] `index.html`
  - [ ] `vite.config.ts`
  - [ ] `tsconfig.json`
  - [ ] `src/main.tsx`
  - [ ] `package.json`
  - [ ] `App.tsx`
  - [ ] `components/` (pasta)
  - [ ] `lib/` (pasta)
  - [ ] `styles/globals.css`

### Variáveis de Ambiente Local (Opcional)
- [ ] Criei arquivo `.env` na raiz
- [ ] Adicionei `VITE_SUPABASE_URL`
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY`

### Teste Local (Opcional)
- [ ] Executei `npm install`
- [ ] Executei `npm run dev`
- [ ] Site abriu em `localhost:5173`
- [ ] Testei cadastro de profissional
- [ ] Funcionou corretamente

---

## 📤 Enviar para GitHub

### Configurar Git
- [ ] `git config --global user.name "Meu Nome"`
- [ ] `git config --global user.email "meu@email.com"`

### Enviar Código
- [ ] `git add .`
- [ ] `git commit -m "Fix: Adicionar configuração do Vite"`
- [ ] `git push`
- [ ] Código apareceu no GitHub

---

## 🚀 Deploy na Vercel

### Importar Projeto
- [ ] Acessei https://vercel.com
- [ ] Fiz login com GitHub
- [ ] Cliquei em "Add New..." → "Project"
- [ ] Encontrei "attendance_list"
- [ ] Cliquei em "Import"

### Configurar Variáveis
- [ ] Na tela de configuração, encontrei "Environment Variables"
- [ ] Adicionei variável: `VITE_SUPABASE_URL`
- [ ] Colei a URL do Supabase
- [ ] Adicionei variável: `VITE_SUPABASE_ANON_KEY`
- [ ] Colei a chave anon do Supabase

### Deploy
- [ ] Cliquei em "Deploy"
- [ ] Aguardei 1-2 minutos
- [ ] Deploy completou com sucesso ✅
- [ ] Recebi URL do site (ex: `attendance-list.vercel.app`)

### Testar Site
- [ ] Acessei a URL do site
- [ ] Site carregou sem erros
- [ ] Testei cadastrar profissional
- [ ] Testei criar lista de presença
- [ ] Testei registrar presença
- [ ] Testei gerar PDF
- [ ] Tudo funcionando! 🎉

---

## 🔵 Deploy na Netlify (Alternativa)

### Importar Projeto
- [ ] Acessei https://netlify.com
- [ ] Fiz login com GitHub
- [ ] "Add new site" → "Import an existing project"
- [ ] Escolhi GitHub
- [ ] Selecionei "attendance_list"

### Configurar Build
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`

### Configurar Variáveis
- [ ] Fui em "Site settings"
- [ ] "Environment variables"
- [ ] Adicionei `VITE_SUPABASE_URL`
- [ ] Adicionei `VITE_SUPABASE_ANON_KEY`

### Deploy
- [ ] Cliquei em "Deploy site"
- [ ] Aguardei alguns minutos
- [ ] Deploy completou com sucesso ✅
- [ ] Site disponível (ex: `attendance-list.netlify.app`)

---

## ✅ Verificação Final

### Funcionalidades do Site
- [ ] ✅ Site abre sem erros
- [ ] ✅ Cadastro de profissional funciona
- [ ] ✅ Verificação de duplicata funciona
- [ ] ✅ Criação de lista de presença funciona
- [ ] ✅ Check-in com digital funciona
- [ ] ✅ Cronômetro funciona
- [ ] ✅ Geração de PDF funciona
- [ ] ✅ Dados são salvos no Supabase

### Deploy Automático
- [ ] Fiz uma pequena mudança no código
- [ ] `git add . && git commit -m "Teste" && git push`
- [ ] Plataforma detectou mudança automaticamente
- [ ] Site foi atualizado automaticamente
- [ ] Deploy automático funciona! ✅

---

## 🎊 PARABÉNS!

Se você marcou todos os itens acima:

✅ **Seu site está NO AR!**  
✅ **Banco de dados funcionando!**  
✅ **Deploy automático configurado!**  
✅ **Tudo 100% funcional!**  

---

## 📊 Status do Projeto

Marque o status atual:

- [ ] ⬜ Ainda não comecei
- [ ] 🟨 Em progresso
- [ ] ✅ Tudo pronto e funcionando!

---

## 🔄 Atualizações Futuras

Sempre que quiser atualizar o site:

1. Fazer mudanças no código
2. `git add .`
3. `git commit -m "Descrição da mudança"`
4. `git push`
5. Deploy automático acontece! ✨

---

## 📱 Compartilhar o Site

Meu site está em:
```
URL: https://_____________________.vercel.app
```

Compartilhe com:
- [ ] Colegas de trabalho
- [ ] Equipe
- [ ] Clientes
- [ ] Portfolio

---

## 🆘 Se Algo Der Errado

Consulte estes arquivos:
- [ ] `PROBLEMAS_COMUNS.md` - Soluções para erros
- [ ] `FIX_BUILD_ERROR.md` - Correção do build
- [ ] `COMECE_AQUI.md` - Guia inicial
- [ ] `COMANDOS_RAPIDOS.md` - Comandos úteis

---

## 📝 Notas Pessoais

Espaço para suas anotações:

```
Supabase URL: ____________________________________

Deploy URL: ______________________________________

Data do primeiro deploy: _________________________

Observações:
_________________________________________________
_________________________________________________
_________________________________________________
```

---

**Use este checklist sempre que precisar fazer deploy de um novo projeto!** ✅

**Imprima ou salve este arquivo para consulta rápida!** 📋
