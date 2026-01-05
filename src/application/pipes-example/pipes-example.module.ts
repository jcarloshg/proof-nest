import { Module } from '@nestjs/common';
import { PipesExampleController } from './pipes-example.controller';
import { FileSizePipe } from './file-size.pipe';

@Module({
  controllers: [PipesExampleController],
  providers: [FileSizePipe],
})
export class PipesExampleModule {}
