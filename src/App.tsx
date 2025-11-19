import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { ProfessionalRegistration } from './components/professional-registration';
import { MeetingForm } from './components/meeting-form';
import { AttendanceTracking } from './components/attendance-tracking';
import { PDFGenerator } from './components/pdf-generator';
import { UserPlus, ClipboardList, Database } from 'lucide-react';

type Screen = 'menu' | 'register' | 'new-meeting' | 'tracking' | 'pdf';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentMeetingId, setCurrentMeetingId] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string>('');

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setInitError('Por favor, configure as credenciais do Supabase nas variáveis de ambiente.');
        setIsInitialized(true);
        return;
      }

      await initializeDatabase();
    } catch (error: any) {
      console.error('Erro ao verificar conexão:', error);
      setInitError(error.message || 'Erro ao conectar com Supabase');
      setIsInitialized(true);
    }
  };

  const initializeDatabase = async () => {
    try {
      // Create tables if they don't exist
      const { error: profError } = await supabase.rpc('create_table_if_not_exists', {
        table_name: 'professionals',
        table_schema: `
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          nome_completo TEXT NOT NULL,
          email_corporativo TEXT NOT NULL,
          funcao TEXT NOT NULL,
          empresa TEXT NOT NULL,
          fingerprint_hash TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        `
      }).catch(() => ({ error: null }));

      // For simplicity, we'll create tables directly with SQL
      // Professionals table
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS professionals (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            nome_completo TEXT NOT NULL,
            email_corporativo TEXT NOT NULL,
            funcao TEXT NOT NULL,
            empresa TEXT NOT NULL,
            fingerprint_hash TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      }).catch(() => ({}));

      // Meetings table
      await supabase.rpc('exec_sql', {
        sql: `
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
        `
      }).catch(() => ({}));

      // Attendances table
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS attendances (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
            professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
            numero_linha INTEGER NOT NULL,
            data_hora_assinatura TIMESTAMP WITH TIME ZONE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(meeting_id, professional_id)
          );
        `
      }).catch(() => ({}));

      setIsInitialized(true);
    } catch (error: any) {
      console.error('Erro ao inicializar banco de dados:', error);
      setInitError(error.message || 'Erro desconhecido');
      setIsInitialized(true); // Continue anyway
    }
  };

  const handleMeetingCreated = (meetingId: string) => {
    setCurrentMeetingId(meetingId);
    setScreen('tracking');
  };

  const handleMeetingFinished = () => {
    setScreen('pdf');
  };

  const backToMenu = () => {
    setScreen('menu');
    setCurrentMeetingId('');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Database className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <h2>Inicializando banco de dados...</h2>
          <p className="text-sm text-gray-600 mt-2">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  if (screen === 'register') {
    return <ProfessionalRegistration onBack={backToMenu} />;
  }

  if (screen === 'new-meeting') {
    return <MeetingForm onMeetingCreated={handleMeetingCreated} onBack={backToMenu} />;
  }

  if (screen === 'tracking' && currentMeetingId) {
    return <AttendanceTracking meetingId={currentMeetingId} onFinish={handleMeetingFinished} />;
  }

  if (screen === 'pdf' && currentMeetingId) {
    return <PDFGenerator meetingId={currentMeetingId} onBack={backToMenu} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="mb-4">Sistema de Registro Biométrico</h1>
          <p className="text-gray-600">Gestão de Presença com Identificação por Digital</p>
        </div>

        {initError && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Aviso:</strong> Algumas funcionalidades podem estar limitadas. 
              Configure as permissões do Supabase se necessário.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Register Professional Card */}
          <button
            onClick={() => setScreen('register')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h2>Cadastrar Profissional</h2>
            </div>
            <p className="text-gray-600">
              Registre novos profissionais no sistema com coleta de digital e dados pessoais
            </p>
          </button>

          {/* New Meeting Card */}
          <button
            onClick={() => setScreen('new-meeting')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <ClipboardList className="w-8 h-8 text-green-600" />
              </div>
              <h2>Nova Lista de Presença</h2>
            </div>
            <p className="text-gray-600">
              Crie uma nova lista de presença para reunião, curso ou treinamento
            </p>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/80 backdrop-blur rounded-lg p-6 border border-gray-200">
          <h3 className="mb-3">ℹ️ Informações Importantes</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Simulação de Digital:</strong> Este aplicativo simula a leitura de digitais, pois navegadores web não têm acesso direto a leitores biométricos</li>
            <li>• <strong>Proteção de Dados:</strong> Dados biométricos são sensíveis e requerem criptografia robusta e conformidade com LGPD em ambiente de produção</li>
            <li>• <strong>Prevenção de Duplicatas:</strong> O sistema verifica automaticamente se a digital já está cadastrada</li>
            <li>• <strong>Exportação PDF:</strong> Ao finalizar a reunião, a lista pode ser exportada em formato PDF</li>
          </ul>
        </div>
      </div>
    </div>
  );
}