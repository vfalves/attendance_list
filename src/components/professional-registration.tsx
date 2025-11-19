import { useState } from 'react';
import { FingerprintScanner } from './fingerprint-scanner';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface ProfessionalRegistrationProps {
  onBack: () => void;
}

export function ProfessionalRegistration({ onBack }: ProfessionalRegistrationProps) {
  const [step, setStep] = useState<'form' | 'scan' | 'success' | 'duplicate'>('form');
  const [formData, setFormData] = useState({
    nome_completo: '',
    email_corporativo: '',
    funcao: '',
    empresa: ''
  });
  const [fingerprintHash, setFingerprintHash] = useState<string>('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('scan');
  };

  const handleScanComplete = async (hash: string) => {
    setFingerprintHash(hash);

    // Check if fingerprint already exists
    const { data: existing, error: checkError } = await supabase
      .from('professionals')
      .select('*')
      .eq('fingerprint_hash', hash)
      .single();

    if (existing) {
      setMessage(`Profissional já cadastrado: ${existing.nome_completo}`);
      setStep('duplicate');
      return;
    }

    // Register new professional
    const { data, error } = await supabase
      .from('professionals')
      .insert([
        {
          ...formData,
          fingerprint_hash: hash
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage('Erro ao cadastrar profissional. Tente novamente.');
      setStep('duplicate');
    } else {
      setMessage(`Profissional cadastrado com sucesso!`);
      setStep('success');
    }
  };

  const resetForm = () => {
    setFormData({
      nome_completo: '',
      email_corporativo: '',
      funcao: '',
      empresa: ''
    });
    setFingerprintHash('');
    setMessage('');
    setStep('form');
  };

  if (step === 'success' || step === 'duplicate') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex flex-col items-center gap-6 p-8 border rounded-lg">
          {step === 'success' ? (
            <CheckCircle className="w-24 h-24 text-green-600" />
          ) : (
            <XCircle className="w-24 h-24 text-orange-600" />
          )}
          
          <h2 className={step === 'success' ? 'text-green-600' : 'text-orange-600'}>
            {message}
          </h2>
          
          <div className="flex gap-4">
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Cadastrar Outro
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'scan') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => setStep('form')}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="border rounded-lg p-6">
          <h2 className="mb-6">Escaneie a Digital de {formData.nome_completo}</h2>
          <FingerprintScanner onScanComplete={handleScanComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar ao Menu
      </button>

      <div className="border rounded-lg p-6">
        <h2 className="mb-6">Cadastro de Profissional</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Nome Completo *</label>
            <input
              type="text"
              required
              value={formData.nome_completo}
              onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2">Email Corporativo *</label>
            <input
              type="email"
              required
              value={formData.email_corporativo}
              onChange={(e) => setFormData({ ...formData, email_corporativo: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2">Função *</label>
            <input
              type="text"
              required
              value={formData.funcao}
              onChange={(e) => setFormData({ ...formData, funcao: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2">Empresa *</label>
            <input
              type="text"
              required
              value={formData.empresa}
              onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continuar para Escaneamento
          </button>
        </form>
      </div>
    </div>
  );
}
