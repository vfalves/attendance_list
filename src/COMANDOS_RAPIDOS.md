# ⚡ Comandos Rápidos

## 🚀 Subir o Código e Corrigir o Build

```bash
# Comando único - execute este e pronto!
git add . && git commit -m "Fix: Adicionar configuração do Vite" && git push
```

Após executar, aguarde 1-2 minutos e seu site estará no ar! 🎉

---

## 📦 Comandos Git Básicos

### Primeira vez (inicializar)
```bash
git init
git add .
git commit -m "Primeiro commit"
git remote add origin https://github.com/vfalves/attendance_list.git
git branch -M main
git push -u origin main
```

### Atualizar código
```bash
git add .
git commit -m "Descrição da mudança"
git push
```

### Ver status
```bash
git status
```

### Ver diferenças
```bash
git diff
```

### Ver histórico
```bash
git log --oneline
```

---

## 🛠️ Comandos NPM

### Instalar dependências
```bash
npm install
```

### Executar localmente
```bash
npm run dev
```

### Fazer build
```bash
npm run build
```

### Visualizar build
```bash
npm run preview
```

### Limpar cache
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Comandos de Verificação

### Verificar versões
```bash
node --version
npm --version
git --version
```

### Testar conexão Git
```bash
git remote -v
```

### Ver variáveis de ambiente (local)
```bash
# Mac/Linux
cat .env

# Windows (PowerShell)
Get-Content .env
```

---

## 🌐 Comandos Vercel CLI (Opcional)

Se quiser usar a CLI da Vercel:

### Instalar
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
vercel
```

### Deploy para produção
```bash
vercel --prod
```

---

## 🔧 Comandos de Limpeza

### Limpar tudo e reinstalar
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Resetar Git (cuidado!)
```bash
# Remove último commit (mantém mudanças)
git reset HEAD~1

# Remove último commit (perde mudanças)
git reset --hard HEAD~1
```

---

## 📋 Sequência Completa de Deploy

### 1️⃣ Preparar código
```bash
git add .
git commit -m "Preparar para deploy"
```

### 2️⃣ Enviar para GitHub
```bash
git push
```

### 3️⃣ Acessar plataforma
- Vercel: https://vercel.com
- Netlify: https://netlify.com

### 4️⃣ Importar projeto
- Escolher "attendance_list"

### 5️⃣ Configurar variáveis
- Adicionar `VITE_SUPABASE_URL`
- Adicionar `VITE_SUPABASE_ANON_KEY`

### 6️⃣ Deploy!
- Clicar em "Deploy"
- Aguardar 1-2 minutos
- ✅ Site no ar!

---

## 🆘 Comandos de Emergência

### Desfazer mudanças locais
```bash
git checkout .
```

### Atualizar do GitHub
```bash
git pull
```

### Forçar push (cuidado!)
```bash
git push --force
```

### Ver erros de build
```bash
npm run build 2>&1 | tee build.log
cat build.log
```

---

## 📱 Abrir URLs Rápido

### Abrir GitHub
```bash
# Mac/Linux
open https://github.com/vfalves/attendance_list

# Windows
start https://github.com/vfalves/attendance_list
```

### Abrir Vercel
```bash
# Mac/Linux
open https://vercel.com

# Windows
start https://vercel.com
```

### Abrir Supabase
```bash
# Mac/Linux
open https://supabase.com

# Windows
start https://supabase.com
```

---

## 🎯 Fluxo de Trabalho Típico

```bash
# 1. Fazer mudanças no código
# 2. Ver o que mudou
git status

# 3. Adicionar mudanças
git add .

# 4. Fazer commit
git commit -m "Descrição clara da mudança"

# 5. Enviar para GitHub
git push

# 6. Deploy automático acontece!
# 7. Aguardar 1-2 minutos
# 8. Site atualizado! ✅
```

---

## 💡 Dicas Úteis

### Commit com mensagem rápida
```bash
git commit -am "Mensagem rápida"
```

### Ver últimos commits
```bash
git log -3 --oneline
```

### Criar branch
```bash
git checkout -b nova-feature
```

### Voltar para main
```bash
git checkout main
```

### Atualizar e fazer push
```bash
git pull && git add . && git commit -m "Update" && git push
```

---

## 🔐 Configurar Git (Primeira Vez)

```bash
# Configurar nome
git config --global user.name "Seu Nome"

# Configurar email
git config --global user.email "seu@email.com"

# Ver configurações
git config --list
```

---

## 📊 Comandos de Análise

### Ver tamanho do projeto
```bash
du -sh .
```

### Contar linhas de código
```bash
find . -name '*.tsx' -o -name '*.ts' | xargs wc -l
```

### Ver dependências desatualizadas
```bash
npm outdated
```

### Atualizar dependências
```bash
npm update
```

---

## 🎨 Comandos de Desenvolvimento

### Abrir VSCode
```bash
code .
```

### Abrir no navegador
```bash
npm run dev
# Depois abrir: http://localhost:5173
```

### Ver logs do Vite
```bash
npm run dev -- --debug
```

---

## ✅ Checklist Diário

```bash
# Ao começar o dia
git pull                    # Atualizar código
npm install                 # Atualizar dependências
npm run dev                 # Rodar localmente

# Ao terminar o dia
git add .                   # Adicionar mudanças
git commit -m "Trabalho do dia"  # Commit
git push                    # Enviar para GitHub
```

---

## 🚀 Comando ULTIMATE (Faz Tudo)

```bash
# Este comando faz TUDO de uma vez:
git add . && \
git commit -m "$(date '+%Y-%m-%d %H:%M:%S') - Atualização" && \
git push && \
echo "✅ Código enviado! Deploy automático em andamento..."
```

---

**Use este arquivo como referência rápida! 📖**

Copie e cole os comandos conforme necessário! 🚀
