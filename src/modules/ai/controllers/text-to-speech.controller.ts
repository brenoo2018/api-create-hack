import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { TextToSpeechUseCase } from '../use-cases/text-to-speech.use-case';
import { textToSpeechSchema, TextToSpeechRequest } from '../schemas/text-to-speech.schema';

@Controller('ai')
export class TextToSpeechController {
  constructor(private readonly textToSpeechUseCase: TextToSpeechUseCase) {}

  @Post('text-to-speech')
  async textToSpeech(
    @Body(new ZodValidationPipe(textToSpeechSchema)) body: TextToSpeechRequest,
    @Res() res: Response,
  ) {
    const audioBuffer = await this.textToSpeechUseCase.execute(body);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length.toString(),
      'Content-Disposition': 'attachment; filename="speech.mp3"',
    });

    res.status(HttpStatus.OK).send(audioBuffer);
  }
}
