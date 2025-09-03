import { Env } from '@/env';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApologistService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private configService: ConfigService<Env, true>) {
    this.baseUrl = this.configService.get('APOLOGIST_BASE_URL', {infer: true});
    this.apiKey = this.configService.get('APOLOGIST_API_KEY', {infer: true});
  }

  async askQuestion(question: string, context?: string): Promise<{
    answer: string;
    confidence?: number;
    sources?: string[];
  }> {
    try {
      const messages: Array<{ role: string; content: string }> = [];
      
      if (context) {
        messages.push({
          role: 'system',
          content: `Contexto: ${context}`,
        });
      }
      
      messages.push({
        role: 'user',
        content: question,
      });

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          messages,
          stream: false,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const answer = data.choices[0]?.message?.content || 'No response received';
      
      return {
        answer,
        confidence: data.confidence,
        sources: data.sources,
      };
    } catch (error) {
      console.error('error here', error);
      throw new HttpException(
        'Failed to get response from Apologist AI',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async textToSpeech(text: string, options?: {
    voice?: 'male' | 'female';
    speed?: number;
    language?: string;
  }): Promise<Buffer> {
    try {
      const response = await fetch(`${this.baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          input: text,
          voice: options?.voice || 'male',
          speed: options?.speed || 1.0,
          language: options?.language || 'pt-BR',
          response_format: 'mp3',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBuffer = await response.arrayBuffer();
      return Buffer.from(audioBuffer);
    } catch (error) {
      console.error('TTS error:', error);
      throw new HttpException(
        'Failed to generate speech from Apologist AI',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async speechToText(audioBuffer: Buffer, options?: {
    language?: string;
    format?: string;
  }): Promise<string> {
    try {
      const formData = new FormData();
      const audioBlob = new Blob([new Uint8Array(audioBuffer)], { 
        type: options?.format || 'audio/mp3' 
      });
      
      formData.append('file', audioBlob, 'audio.mp3');
      formData.append('language', options?.language || 'pt-BR');

      const response = await fetch(`${this.baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('STT error:', error);
      throw new HttpException(
        'Failed to transcribe audio from Apologist AI',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
