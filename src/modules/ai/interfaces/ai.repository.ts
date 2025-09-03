export interface AiRepository {
  askQuestion(question: string, context?: string): Promise<{
    answer: string;
    confidence?: number;
    sources?: string[];
  }>;

  textToSpeech(text: string, options?: {
    voice?: 'male' | 'female';
    speed?: number;
    language?: string;
  }): Promise<Buffer>;

  speechToText(audioBuffer: Buffer, options?: {
    language?: string;
    format?: string;
  }): Promise<string>;
}
