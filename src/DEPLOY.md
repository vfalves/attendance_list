# 🚀 Como Colocar o Site no Ar

## ⚠️ IMPORTANTE: GitHub x Hospedagem

**GitHub** = Armazena o código-fonte (como um arquivo no Google Drive)
**Hospedagem/Deploy** = Coloca o site no ar para funcionar

Para o site funcionar, você precisa fazer o **DEPLOY** em uma das plataformas abaixo:

---

## 🌟 OPÇÃO 1: Vercel (MAIS FÁCIL - RECOMENDADO)

A Vercel é gratuita e integra direto com o GitHub!

### Passo a Passo:

#### 1. Criar Conta na Vercel
- Acesse: **https://vercel.com**
- Clique em **"Sign Up"**
- Escolha **"Continue with GitHub"**
- Autorize a Vercel

#### 2. Importar o Projeto
- No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
- Procure por **"attendance_list"**
- Clique em **"Import"**

#### 3. Configurar Variáveis de Ambiente (MUITO IMPORTANTE!)
Antes de fazer o deploy, você precisa adicionar suas credenciais do Supabase:

1. Na página de configuração, encontre **"Environment Variables"**
2. Adicione estas duas variáveis:

**Variável 1:**
```
Name: VITE_SUPABASE_URL
Value: https://seu-projeto.supabase.co
```

**Variável 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 💡 **Onde encontrar essas informações?**
> 1. Acesse seu projeto no Supabase: https://supabase.com
> 2. Vá em **Settings** → **API**
> 3. Copie a **Project URL** e a **anon/public key**

#### 4. Fazer o Deploy
- Clique em **"Deploy"**
- Aguarde 1-2 minutos
- Pronto! Seu site estará no ar! 🎉

#### 5. Acessar o Site
Você receberá uma URL tipo:
```
https://attendance-list.vercel.app
```

---

## 🔵 OPÇÃO 2: Netlify

Alternativa igualmente boa e gratuita!

### Passo a Passo:

#### 1. Criar Conta
- Acesse: **https://netlify.com**
- Clique em **"Sign Up"**
- Escolha **"GitHub"**

#### 2. Importar Projeto
- Clique em **"Add new site"** → **"Import an existing project"**
- Escolha **"GitHub"**
- Selecione **"attendance_list"**

#### 3. Configurar Build
- **Build command:** `npm run build`
- **Publish directory:** `dist`

#### 4. Adicionar Variáveis de Ambiente
- Antes de fazer deploy, clique em **"Site settings"**
- Vá em **"Environment variables"**
- Adicione:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

#### 5. Deploy
- Clique em **"Deploy site"**
- Aguarde alguns minutos
- Site estará disponível em: `https://seu-site.netlify.app`

---

## 📄 OPÇÃO 3: GitHub Pages (Limitado)

⚠️ **Limitação:** GitHub Pages não suporta variáveis de ambiente facilmente, então o banco de dados não funcionará sem configurações adicionais.

Só recomendo se você quiser apenas ver o layout sem funcionalidades.

### Como fazer:

1. No seu repositório GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. Crie o arquivo `.github/workflows/deploy.yml` (vou criar para você)

---

## ✅ Checklist de Deploy

Antes de fazer o deploy, certifique-se:

- [ ] Código está no GitHub
- [ ] Projeto Supabase criado
- [ ] Tabelas criadas no Supabase (executou o SQL)
- [ ] Você tem a URL e a chave do Supabase em mãos
- [ ] Escolheu uma plataforma (Vercel ou Netlify)

## 🔄 Atualizações Automáticas

Depois do primeiro deploy:

✅ Toda vez que você fizer `git push` para o GitHub
✅ A Vercel/Netlify detecta automaticamente
✅ E faz o deploy da nova versão!

**É totalmente automático!** 🎉

---

## 🆘 Problemas Comuns

### "Site abre mas não conecta ao banco"
➜ Você esqueceu de adicionar as variáveis de ambiente na Vercel/Netlify

### "Build failed"
➜ Verifique se o `package.json` está correto e todas as dependências estão instaladas

### "404 ao recarregar a página"
➜ O arquivo `vercel.json` resolve isso (já está incluído no projeto)

---

## 📱 Resultado Final

Depois do deploy, você terá:

✅ Site funcionando 24/7 na internet
✅ URL pública para compartilhar
✅ HTTPS automático (seguro)
✅ Atualizações automáticas via git push
✅ Gratuito!

---

## 🎯 Resumo Rápido

```bash
# 1. Código no GitHub
git add .
git commit -m "Preparar para deploy"
git push

# 2. Acessar Vercel
https://vercel.com → Sign up with GitHub

# 3. Import Project
Escolher attendance_list

# 4. Adicionar variáveis
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

# 5. Deploy!
Clicar em Deploy

# 6. Site no ar! 🚀
https://attendance-list.vercel.app
```

---

**Qualquer dúvida, me avise! 🚀**
