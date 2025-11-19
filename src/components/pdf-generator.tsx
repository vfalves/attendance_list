import { useEffect, useState } from 'react';
import { supabase, Meeting, Professional, Attendance } from '../lib/supabase';
import { FileDown, Home } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PDFGeneratorProps {
  meetingId: string;
  onBack: () => void;
}

interface AttendanceRecord extends Attendance {
  professional: Professional;
}

export function PDFGenerator({ meetingId, onBack }: PDFGeneratorProps) {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    loadData();
  }, [meetingId]);

  const loadData = async () => {
    const { data: meetingData } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .single();

    const { data: attendanceData } = await supabase
      .from('attendances')
      .select(`
        *,
        professional:professionals(*)
      `)
      .eq('meeting_id', meetingId)
      .order('numero_linha', { ascending: true });

    if (meetingData) setMeeting(meetingData);
    if (attendanceData) setAttendances(attendanceData as any);
  };

  const generatePDF = () => {
    if (!meeting) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Title
    doc.setFontSize(16);
    doc.text('LISTA DE PRESENÇA', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Header Information
    doc.setFontSize(10);
    doc.text(`Instalação: ${meeting.nome_instalacao}`, 14, yPosition);
    yPosition += 6;
    doc.text(`Data da Reunião: ${format(new Date(meeting.data_reuniao), 'dd/MM/yyyy', { locale: ptBR })}`, 14, yPosition);
    doc.text(`Hora: ${meeting.hora_reuniao}`, 120, yPosition);
    yPosition += 6;
    doc.text(`Duração da Sessão: ${meeting.duracao_sessao || 'N/A'}`, 14, yPosition);
    yPosition += 10;

    // Course Information
    doc.setFontSize(11);
    doc.text('TÍTULO DO CURSO:', 14, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    const titleLines = doc.splitTextToSize(meeting.titulo_curso, pageWidth - 28);
    doc.text(titleLines, 14, yPosition);
    yPosition += titleLines.length * 5 + 5;

    doc.setFontSize(11);
    doc.text('CONTEÚDO DO CURSO:', 14, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    const contentLines = doc.splitTextToSize(meeting.conteudo_curso, pageWidth - 28);
    doc.text(contentLines, 14, yPosition);
    yPosition += contentLines.length * 5 + 10;

    // Instructor Information
    doc.setFontSize(11);
    doc.text('INFORMAÇÕES DO INSTRUTOR:', 14, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.text(`Nome: ${meeting.nome_instrutor}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Função: ${meeting.funcao_instrutor}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Assinatura: ${meeting.assinatura_instrutor}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Qualificação: ${meeting.qualificacao_instrutor}`, 14, yPosition);
    yPosition += 10;

    // Attendance Table
    const tableData = attendances.map((att) => [
      att.numero_linha.toString(),
      att.professional.nome_completo,
      att.professional.email_corporativo,
      att.professional.funcao,
      meeting.nome_instalacao,
      att.professional.empresa,
      format(new Date(att.data_hora_assinatura), 'dd/MM/yyyy HH:mm', { locale: ptBR })
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Nº', 'Nome Completo', 'Email Corporativo', 'Função', 'Local', 'Empresa', 'Assinatura']],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 }
    });

    // Save PDF
    const fileName = `lista_presenca_${meeting.nome_instalacao}_${format(new Date(meeting.data_reuniao), 'ddMMyyyy')}.pdf`;
    doc.save(fileName);
  };

  if (!meeting) return <div className="p-6">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-lg p-8">
        <h1 className="mb-6 text-center">Reunião Concluída</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-green-800 mb-4">Resumo da Reunião</h2>
          
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Instalação:</span>
                <div>{meeting.nome_instalacao}</div>
              </div>
              <div>
                <span className="text-gray-600">Data:</span>
                <div>{format(new Date(meeting.data_reuniao), 'dd/MM/yyyy', { locale: ptBR })}</div>
              </div>
              <div>
                <span className="text-gray-600">Hora:</span>
                <div>{meeting.hora_reuniao}</div>
              </div>
              <div>
                <span className="text-gray-600">Duração:</span>
                <div>{meeting.duracao_sessao}</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <span className="text-gray-600">Curso:</span>
              <div>{meeting.titulo_curso}</div>
            </div>
            
            <div>
              <span className="text-gray-600">Instrutor:</span>
              <div>{meeting.nome_instrutor} - {meeting.funcao_instrutor}</div>
            </div>
            
            <div>
              <span className="text-gray-600">Participantes:</span>
              <div>{attendances.length} pessoa(s)</div>
            </div>
          </div>
        </div>

        {/* Attendance Preview */}
        <div className="mb-6">
          <h3 className="mb-3">Lista de Participantes</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Nº</th>
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Função</th>
                  <th className="text-left p-2">Empresa</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((att) => (
                  <tr key={att.id} className="border-t">
                    <td className="p-2">{att.numero_linha}</td>
                    <td className="p-2">{att.professional.nome_completo}</td>
                    <td className="p-2">{att.professional.funcao}</td>
                    <td className="p-2">{att.professional.empresa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={generatePDF}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileDown className="w-5 h-5" />
            Baixar PDF
          </button>
          
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Home className="w-5 h-5" />
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
