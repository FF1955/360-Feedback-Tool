import React, { useRef } from 'react';
import { Upload, X, FileText, Wand2, Settings2 } from 'lucide-react';
import { UserInput, AnalysisOptions } from '../types';

interface InputSectionProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  options: AnalysisOptions;
  setOptions: React.Dispatch<React.SetStateAction<AnalysisOptions>>;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  options,
  setOptions,
  onAnalyze,
  isAnalyzing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(prev => ({ ...prev, text: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setInput(prev => ({ ...prev, image: null, imagePreview: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStyleLabel = (value: number) => {
    if (value < 33) return 'Casual';
    if (value < 66) return 'Balanced';
    return 'Formal';
  };

  const getLengthLabel = (value: number) => {
    if (value < 33) return 'Concise';
    if (value < 66) return 'Moderate';
    return 'Detailed';
  };

  const canAnalyze = (input.text.trim() || input.image) && !isAnalyzing;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-slate-800">Input</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-5 overflow-y-auto">
        <div className="flex-1 min-h-0">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Performance Summary Text
          </label>
          <textarea
            value={input.text}
            onChange={handleTextChange}
            placeholder="Paste your performance summary, achievements, or feedback here..."
            className="w-full h-full min-h-[200px] p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 text-sm leading-relaxed placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Image (Optional)
          </label>

          {input.imagePreview ? (
            <div className="relative group">
              <img
                src={input.imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-xl border border-slate-200"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
            >
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm text-slate-500 group-hover:text-blue-600 transition-colors">
                Click to upload image
              </span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Analysis Options</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-600">Writing Style</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {getStyleLabel(options.style)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.style}
                onChange={(e) => setOptions(prev => ({ ...prev, style: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Casual</span>
                <span>Formal</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-600">Output Length</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {getLengthLabel(options.length)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Concise</span>
                <span>Detailed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className={`w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            canAnalyze
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Analyze Performance</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
