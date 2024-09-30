import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { ShelfSchema } from 'src/shelf/shelf.schema';
import { ShelfModule } from 'src/shelf/shelf.module';

@Module({
  //Conexion a mongodb, y definir que vamos a GUARDAR
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Shelf', schema: ShelfSchema }]),
    ShelfModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
