import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface';

export type ShelfDocument = HydratedDocument<Shelf>;

@Schema()
export class Shelf {
  @Prop()
  name: string;

  @Prop()
  category: string;

  //se creo la relacion de uno a muchos
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: Product[];
}

export const ShelfSchema = SchemaFactory.createForClass(Shelf);
