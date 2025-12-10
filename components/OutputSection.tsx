import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AlertCircle, FileOutput, Sparkles } from 'lucide-react';
import { AnalysisState } from '../types';

interface OutputSectionProps {
  analysis: AnalysisState;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ analysis }) => {
  const { isLoading, result, error } = analysis;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <FileOutput className="w-5 h-5 text-cyan-500" />
        <h2 className="text-lg font-semibold text-slate-800">Analysis Result</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading && (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-medium">Analyzing your performance...</p>
              <p className="text-sm text-slate-500 mt-1">This may take a moment</p>
            </div>

            <div className="w-full max-w-md space-y-3 mt-4">
              <div className="h-4 loading-shimmer rounded-full" />
              <div className="h-4 loading-shimmer rounded-full w-4/5" />
              <div className="h-4 loading-shimmer rounded-full w-3/5" />
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-center max-w-sm">
              <p className="text-slate-700 font-medium">Analysis Failed</p>
              <p className="text-sm text-red-500 mt-2 bg-red-50 px-4 py-2 rounded-lg">
                {error}
              </p>
            </div>
          </div>
        )}

        {result && !isLoading && (
          <div className="markdown-content prose prose-slate max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}

        {!isLoading && !error && !result && (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <FileOutput className="w-10 h-10 text-slate-300" />
            </div>
            <div>
              <p className="text-slate-600 font-medium">No analysis yet</p>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">
                Enter your performance summary and click "Analyze" to get AI-powered insights
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
