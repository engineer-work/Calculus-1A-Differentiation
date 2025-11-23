import React, { useState, useEffect, useRef } from 'react';
import { generateSpeech } from '../services/geminiService';

// --- Types ---
interface SelectionReaderProps {
  // No longer needs explicit voice props as we use Gemini
}

// --- Audio Helper Functions (PCM Decoding) ---

// Decodes Base64 string to Uint8Array
const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Converts Raw PCM (Int16) to AudioBuffer (Float32)
const pcmToAudioBuffer = (
  pcmData: Uint8Array, 
  audioCtx: AudioContext, 
  sampleRate: number = 24000
): AudioBuffer => {
  const int16Data = new Int16Array(pcmData.buffer);
  const frameCount = int16Data.length;
  const audioBuffer = audioCtx.createBuffer(1, frameCount, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Convert Int16 (-32768 to 32767) to Float32 (-1.0 to 1.0)
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = int16Data[i] / 32768.0;
  }

  return audioBuffer;
};


// --- Selection Reader Component (Gemini Powered) ---

export const SelectionReader: React.FC<SelectionReaderProps> = () => {
  const [activeRange, setActiveRange] = useState<Range | null>(null);
  const [textToRead, setTextToRead] = useState<string | null>(null);
  const [controlsPos, setControlsPos] = useState<{top: number, left: number} | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  
  // Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // 1. Detect Selection
  useEffect(() => {
    const handleSelectionChange = () => {
      // Don't hide controls if we are busy (loading/playing)
      if (status !== 'idle') return;

      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
        try {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Only show if selection is visible on screen
            if (rect.width > 0 && rect.height > 0) {
               setActiveRange(range.cloneRange());
               setTextToRead(sel.toString());
               
               // Position controls nicely above text
               setControlsPos({
                   top: window.scrollY + rect.top - 12,
                   left: window.scrollX + rect.left + (rect.width / 2)
               });
            }
        } catch (e) {
            console.warn("Selection capture error", e);
        }
      } else {
         if (status === 'idle') {
            resetReader();
         }
      }
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        stopAudio();
        if (audioCtxRef.current) {
            audioCtxRef.current.close();
        }
    };
  }, []);

  // 2. Playback Logic (Gemini API)
  const handlePlay = async () => {
    if (!textToRead) return;

    try {
        stopAudio(); // Ensure previous audio stops
        setStatus('loading');

        // Initialize Audio Context on user interaction
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume();
        }

        // Fetch high-quality audio
        const base64Audio = await generateSpeech(textToRead);
        
        // Decode
        const pcmBytes = decodeBase64(base64Audio);
        const audioBuffer = pcmToAudioBuffer(pcmBytes, audioCtxRef.current, 24000);

        // Play
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtxRef.current.destination);
        
        source.onended = () => {
            setStatus('idle');
        };

        source.start();
        sourceNodeRef.current = source;
        setStatus('playing');

    } catch (e) {
        console.error("Audio generation failed", e);
        setStatus('idle');
        alert("Failed to generate high-quality audio. Please try again.");
    }
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
    }
    setStatus('idle');
  };

  const resetReader = () => {
    stopAudio();
    window.getSelection()?.removeAllRanges();
    setActiveRange(null);
    setTextToRead(null);
    setControlsPos(null);
  };

  if (!activeRange || !controlsPos) return null;

  return (
    <div 
        style={{ 
            position: 'absolute', 
            top: controlsPos.top, 
            left: controlsPos.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 1000
        }}
        className="pb-3 animate-fade-in-up"
    >
        <div className="bg-slate-900 text-white rounded-full shadow-2xl p-1.5 flex items-center gap-1 border border-slate-700 ring-4 ring-black/5">
            
            {status === 'idle' && (
                <button 
                    onClick={handlePlay}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all font-bold text-sm whitespace-nowrap shadow-md hover:shadow-lg"
                >
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Read
                </button>
            )}

            {status === 'loading' && (
                <div className="flex items-center gap-2 px-4 py-2 text-indigo-200">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs font-bold">Generating Audio...</span>
                </div>
            )}
            
            {status === 'playing' && (
                <div className="flex items-center gap-1">
                    <div className="flex flex-col px-4 border-r border-slate-700">
                         <span className="text-[10px] text-indigo-400 font-bold tracking-wider animate-pulse">PLAYING</span>
                         <span className="text-xs text-white font-mono">Gemini Studio Voice</span>
                    </div>

                    <button 
                        onClick={stopAudio}
                        className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition"
                        title="Stop"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="6" y="6" width="8" height="8" /></svg>
                    </button>
                </div>
            )}
            
            {/* Close (only when idle) */}
            {status === 'idle' && (
                 <button onClick={resetReader} className="text-slate-500 hover:text-white p-2 rounded-full hover:bg-white/10 ml-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                 </button>
            )}
        </div>
        
        {/* Pointer */}
        <div className="w-3 h-3 bg-slate-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5 border-r border-b border-slate-700"></div>
    </div>
  );
};