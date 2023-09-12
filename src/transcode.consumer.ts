import { Process, Processor } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './constants';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  private readonly logger: Logger = new Logger(TranscodeConsumer.name);

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug('Data', job.data);

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000));

    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }
}
