import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelfModule } from './shelf/shelf.module';

@Module({    //utilizacion del modulo del producto, creado en el module.ts
  imports: [ProductModule, 
    //string de conexion a la base de datos mongodb
            MongooseModule.forRoot('mongodb://localhost/products-nest'), ShelfModule],
})
export class AppModule {}
