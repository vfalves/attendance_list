import { useState } from 'react';
import { Fingerprint, Loader2 } from 'lucide-react';
import { simulateFingerprintScan } from '../lib/fingerprint-simulator';

interface FingerprintScannerProps {
  onScanComplete: (hash: string) => void;
  onScanStart?: () => void;
  disabled?: boolean;
}

export function FingerprintScanner({ onScanComplete, onScanStart, disabled }: FingerprintScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    onScanStart?.();
    
    try {
      const hash = await simulateFingerprintScan();
      onScanComplete(hash);
    } catch (error) {
      console.error('Erro ao escanear digital:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg">
      <div className={`relative ${isScanning ? 'animate-pulse' : ''}`}>
        {isScanning ? (
          <Loader2 className="w-24 h-24 text-blue-600 animate-spin" />
        ) : (
          <Fingerprint className="w-24 h-24 text-gray-400" />
        )}
      </div>
      
      <button
        onClick={handleScan}
        disabled={disabled || isScanning}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isScanning ? 'Escaneando...' : 'Escanear Digital'}
      </button>
      
      <p className="text-sm text-gray-600 text-center">
        {isScanning 
          ? 'Mantenha o dedo no sensor...' 
          : 'Clique no botão e coloque o dedo no leitor de digital'}
      </p>
      
      <p className="text-xs text-gray-500 text-center italic">
        Simulação: Em um dispositivo real, isso acessaria o leitor biométrico
      </p>
    </div>
  );
}
