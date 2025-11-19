-- Execute este SQL no Supabase SQL Editor para criar as tabelas necessárias

-- Tabela de Profissionais
CREATE TABLE IF NOT EXISTS professionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo TEXT NOT NULL,
  email_corporativo TEXT NOT NULL,
  funcao TEXT NOT NULL,
  empresa TEXT NOT NULL,
  fingerprint_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Reuniões
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_instalacao TEXT NOT NULL,
  data_reuniao DATE NOT NULL,
  hora_reuniao TIME NOT NULL,
  duracao_sessao TEXT,
  titulo_curso TEXT NOT NULL,
  conteudo_curso TEXT NOT NULL,
  nome_instrutor TEXT NOT NULL,
  funcao_instrutor TEXT NOT NULL,
  assinatura_instrutor TEXT NOT NULL,
  qualificacao_instrutor TEXT NOT NULL,
  inicio_reuniao TIMESTAMP WITH TIME ZONE NOT NULL,
  fim_reuniao TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Presenças
CREATE TABLE IF NOT EXISTS attendances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  numero_linha INTEGER NOT NULL,
  data_hora_assinatura TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(meeting_id, professional_id)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_professionals_fingerprint ON professionals(fingerprint_hash);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_attendances_meeting ON attendances(meeting_id);
CREATE INDEX IF NOT EXISTS idx_attendances_professional ON attendances(professional_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (permitir todas operações para este protótipo)
-- Em produção, você deve configurar políticas mais restritivas

CREATE POLICY "Enable all for professionals" ON professionals
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for meetings" ON meetings
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for attendances" ON attendances
  FOR ALL USING (true) WITH CHECK (true);
