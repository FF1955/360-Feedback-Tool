import { GoogleGenAI } from '@google/genai';
import { AnalysisOptions } from '../types';

const getApiKey = (): string => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your environment.');
  }
  return apiKey;
};

const buildPrompt = (text: string, options: AnalysisOptions): string => {
  const styleDescriptor = options.style < 33
    ? 'casual and friendly'
    : options.style < 66
      ? 'balanced and professional'
      : 'formal and executive-level';

  const lengthDescriptor = options.length < 33
    ? 'concise (2-3 key points)'
    : options.length < 66
      ? 'moderate (4-6 key points with brief explanations)'
      : 'detailed and comprehensive (thorough analysis with examples)';

  return `You are an expert HR consultant and performance coach specializing in 360-degree feedback analysis. Analyze the following performance summary and provide actionable insights.

**Analysis Requirements:**
- Writing style: ${styleDescriptor}
- Output length: ${lengthDescriptor}

**Your analysis should include:**
1. **Key Achievements Summary** - Highlight the most impactful accomplishments
2. **Strengths Identified** - Core competencies and skills demonstrated
3. **Areas for Development** - Constructive suggestions for growth
4. **Impact Assessment** - Quantifiable or qualitative impact of the work
5. **Recommendations** - Specific, actionable next steps

**Performance Summary to Analyze:**
${text}

Please provide your analysis in a clear, structured format using markdown. Use bullet points and headers for readability. If the content is in Chinese, respond in Chinese. If in English, respond in English.`;
};

export const analyzePerformance = async (
  text: string,
  options: AnalysisOptions,
  imageBase64?: string
): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const prompt = buildPrompt(text, options);

  const contents: any[] = [];

  if (imageBase64) {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    contents.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data
      }
    });
  }

  contents.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ role: 'user', parts: contents }]
  });

  const result = response.text;

  if (!result) {
    throw new Error('No response received from AI model');
  }

  return result;
};
