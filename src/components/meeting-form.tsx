import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

interface MeetingFormProps {
  onMeetingCreated: (meetingId: string) => void;
  onBack: () => void;
}

export function MeetingForm({ onMeetingCreated, onBack }: MeetingFormProps) {
  const [formData, setFormData] = useState({
    nome_instalacao: '',
    data_reuniao: new Date().toISOString().split('T')[0],
    hora_reuniao: new Date().toTimeString().slice(0, 5),
    titulo_curso: '',
    conteudo_curso: '',
    nome_instrutor: '',
    funcao_instrutor: '',
    assinatura_instrutor: '',
    qualificacao_instrutor: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('meetings')
      .insert([
        {
          ...formData,
          duracao_sessao: null,
          inicio_reuniao: new Date().toISOString(),
          fim_reuniao: null,
          status: 'em_andamento'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar reunião:', error);
      alert('Erro ao criar reunião. Tente novamente.');
    } else {
      onMeetingCreated(data.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar ao Menu
      </button>

      <div className="border rounded-lg p-6">
        <h2 className="mb-6">Nova Lista de Presença</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Nome da Instalação *</label>
              <input
                type="text"
                required
                value={formData.nome_instalacao}
                onChange={(e) => setFormData({ ...formData, nome_instalacao: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Data da Reunião *</label>
              <input
                type="date"
                required
                value={formData.data_reuniao}
                onChange={(e) => setFormData({ ...formData, data_reuniao: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Hora da Reunião *</label>
              <input
                type="time"
                required
                value={formData.hora_reuniao}
                onChange={(e) => setFormData({ ...formData, hora_reuniao: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Course Information */}
          <div>
            <label className="block mb-2">Título do Curso *</label>
            <input
              type="text"
              required
              value={formData.titulo_curso}
              onChange={(e) => setFormData({ ...formData, titulo_curso: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2">Conteúdo do Curso *</label>
            <textarea
              required
              rows={4}
              value={formData.conteudo_curso}
              onChange={(e) => setFormData({ ...formData, conteudo_curso: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Instructor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Nome do Instrutor *</label>
              <input
                type="text"
                required
                value={formData.nome_instrutor}
                onChange={(e) => setFormData({ ...formData, nome_instrutor: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Função do Instrutor *</label>
              <input
                type="text"
                required
                value={formData.funcao_instrutor}
                onChange={(e) => setFormData({ ...formData, funcao_instrutor: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Assinatura do Instrutor *</label>
              <input
                type="text"
                required
                value={formData.assinatura_instrutor}
                onChange={(e) => setFormData({ ...formData, assinatura_instrutor: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-2">Qualificação do Instrutor *</label>
              <input
                type="text"
                required
                value={formData.qualificacao_instrutor}
                onChange={(e) => setFormData({ ...formData, qualificacao_instrutor: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Iniciar Reunião e Registro de Presença
          </button>
        </form>
      </div>
    </div>
  );
}
