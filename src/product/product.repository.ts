import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  //La inyección de este modelo dentro del constructor permite que la clase lo utilice a través de la variable productModel
  //para interactuar con la colección Product en MongoDB.

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      //busca todos los productos que estan cargados en la B y lo retorna
      return await this.productModel.find();
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
  //se utiliza este constructor para la creacion del CRUD:
  //se utiliza la promesa porque es asincrono
  async findById(productID: string): Promise<Product> {
    try {
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
    //busca un producto por ID en la BD y luego lo retorna
    return await this.productModel.findById(productID);
  }
  //creacion de un producto que vamos a guardar en la bd
  async save(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
    } catch (error) {
      console.error('Error al crear un producto:', error);
    }
    //devuelve ese producto creado
    return await this.productModel.create(createProductDTO);
  }
  //eliminar el producto solo por ID, luego retorna ese producto eliminado
  async remove(productID: string): Promise<Product> {
    try {
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
    //el metodo busca por ID y lo elimina
    return await this.productModel.findByIdAndDelete(productID);
  }
  //para actualizar el producto, 2 parametros:buscar el producto por ID y crear
  async modify(
    productID: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    try {
    } catch (error) {
      console.error('Error al actualizar los productos:', error);
    }
    //actualiza el producto con ambos parametros y lo actualiza por ID; luego lo retorna
    return await this.productModel.findByIdAndUpdate(
      productID,
      updateProductDTO,
      { new: true },
    );
  }
}
