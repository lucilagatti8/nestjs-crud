import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Shelf } from 'src/shelf/shelf.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageURL: string;

  @Prop({ required: true })
  price: number;

  // Relación uno a muchos con Shelf (Estante)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shelf' }) // Referencia al ObjectId de Shelf
  shelf: mongoose.Schema.Types.ObjectId; // Especifica que 'shelf' es un ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product);
