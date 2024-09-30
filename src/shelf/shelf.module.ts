import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importa MongooseModule
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { ShelfRepository } from './shelf.repository';
import { Shelf, ShelfSchema } from './shelf.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
  ],
  controllers: [ShelfController],
  providers: [ShelfService, ShelfRepository],
  exports: [ShelfService],
})
export class ShelfModule {}
