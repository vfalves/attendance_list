import { useState, useEffect } from 'react';
import { supabase, Meeting, Professional, Attendance } from '../lib/supabase';
import { FingerprintScanner } from './fingerprint-scanner';
import { Clock, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AttendanceTrackingProps {
  meetingId: string;
  onFinish: () => void;
}

interface AttendanceRecord extends Attendance {
  professional: Professional;
}

export function AttendanceTracking({ meetingId, onFinish }: AttendanceTrackingProps) {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    loadMeeting();
    loadAttendances();

    // Timer for elapsed time
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [meetingId]);

  const loadMeeting = async () => {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .single();

    if (!error && data) {
      setMeeting(data);
    }
  };

  const loadAttendances = async () => {
    const { data, error } = await supabase
      .from('attendances')
      .select(`
        *,
        professional:professionals(*)
      `)
      .eq('meeting_id', meetingId)
      .order('numero_linha', { ascending: true });

    if (!error && data) {
      setAttendances(data as any);
    }
  };

  const handleScanComplete = async (hash: string) => {
    // Find professional by fingerprint
    const { data: professional, error: profError } = await supabase
      .from('professionals')
      .select('*')
      .eq('fingerprint_hash', hash)
      .single();

    if (profError || !professional) {
      setMessage('⚠️ Digital não reconhecida. Profissional não cadastrado.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Check if already signed in
    const { data: existing } = await supabase
      .from('attendances')
      .select('*')
      .eq('meeting_id', meetingId)
      .eq('professional_id', professional.id)
      .single();

    if (existing) {
      setMessage(`⚠️ ${professional.nome_completo} já registrou presença.`);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Add attendance
    const nextNumber = attendances.length + 1;
    const { data: newAttendance, error: attError } = await supabase
      .from('attendances')
      .insert([
        {
          meeting_id: meetingId,
          professional_id: professional.id,
          numero_linha: nextNumber,
          data_hora_assinatura: new Date().toISOString()
        }
      ])
      .select(`
        *,
        professional:professionals(*)
      `)
      .single();

    if (!attError && newAttendance) {
      setAttendances([...attendances, newAttendance as any]);
      setMessage(`✓ ${professional.nome_completo} registrado com sucesso!`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleFinishMeeting = async () => {
    const endTime = new Date();
    const startTime = new Date(meeting!.inicio_reuniao);
    const durationMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const duration = `${hours}h${minutes.toString().padStart(2, '0')}min`;

    const { error } = await supabase
      .from('meetings')
      .update({
        fim_reuniao: endTime.toISOString(),
        duracao_sessao: duration,
        status: 'concluida'
      })
      .eq('id', meetingId);

    if (!error) {
      onFinish();
    }
  };

  const formatElapsedTime = () => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}min ${seconds.toString().padStart(2, '0')}s`;
  };

  if (!meeting) return <div className="p-6">Carregando...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Meeting Header */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Reunião em Andamento</h1>
          <div className="flex items-center gap-2 text-green-600">
            <Clock className="w-5 h-5" />
            <span>{formatElapsedTime()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Instalação:</span> {meeting.nome_instalacao}
          </div>
          <div>
            <span className="text-gray-600">Data:</span> {format(new Date(meeting.data_reuniao), 'dd/MM/yyyy', { locale: ptBR })}
          </div>
          <div>
            <span className="text-gray-600">Hora:</span> {meeting.hora_reuniao}
          </div>
          <div className="md:col-span-3">
            <span className="text-gray-600">Curso:</span> {meeting.titulo_curso}
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>{attendances.length} participante(s)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="mb-4">Registro de Presença</h2>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.includes('✓') ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {message}
            </div>
          )}

          <FingerprintScanner
            onScanComplete={handleScanComplete}
            onScanStart={() => setIsScanning(true)}
          />

          <button
            onClick={handleFinishMeeting}
            className="w-full mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FileText className="inline w-5 h-5 mr-2" />
            Fim de Reunião e Gerar PDF
          </button>
        </div>

        {/* Attendance List */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="mb-4">Lista de Presença</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nº</th>
                  <th className="text-left p-2">Nome Completo</th>
                  <th className="text-left p-2">Função</th>
                  <th className="text-left p-2">Assinatura</th>
                </tr>
              </thead>
              <tbody>
                {attendances.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      Nenhum participante registrado ainda
                    </td>
                  </tr>
                ) : (
                  attendances.map((att) => (
                    <tr key={att.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{att.numero_linha}</td>
                      <td className="p-2">{att.professional.nome_completo}</td>
                      <td className="p-2">{att.professional.funcao}</td>
                      <td className="p-2 text-xs">
                        {format(new Date(att.data_hora_assinatura), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
