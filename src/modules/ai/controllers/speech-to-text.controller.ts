import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { SpeechToTextUseCase } from '../use-cases/speech-to-text.use-case';
import { speechToTextSchema, SpeechToTextRequest } from '../schemas/speech-to-text.schema';

@Controller('ai')
export class SpeechToTextController {
  constructor(private readonly speechToTextUseCase: SpeechToTextUseCase) {}

  @Post('speech-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  async speechToText(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(speechToTextSchema)) body: SpeechToTextRequest,
  ) {
    const result = await this.speechToTextUseCase.execute({
      audioBuffer: file.buffer,
      language: body.language,
      format: file.mimetype,
    });

    return {
      text: result,
      originalFilename: file.originalname,
      fileSize: file.size,
    };
  }
}
