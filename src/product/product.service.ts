import { ShelfService } from './../shelf/shelf.service';
import { ShelfRepository } from './../shelf/shelf.repository';
import { Shelf } from '../shelf/shelf.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { ShelfModule } from '../shelf/shelf.module';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  //La inyección de este modelo dentro del constructor permite que la clase lo utilice a través de la variable productModel
  //para interactuar con la colección Product en MongoDB.

  //hay que inyectar el producmodel y el shelfmodel
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly shelfService: ShelfService,
  ) {}

  async getAll(): Promise<Product[]> {
    //busca todos los productos que estan cargados en la Bd y lo retorna
    return await this.productRepository.findAll();
  }
  //se utiliza este constructor para la creacion del CRUD:
  //se utiliza la promesa porque es asincrono
  async getByID(productID: string): Promise<Product> {
    //busca un producto por ID en la BD y luego lo retorna
    return await this.productRepository.findById(productID);
  }
  //creacion de un producto que vamos a guardar en la bd
  async create(createProductDTO: CreateProductDTO): Promise<Product> {
    //devuelve ese producto creado
    return await this.productRepository.save(createProductDTO);
  }

  // Asignar un estante al producto recien creado
  async assignShelfToProduct(
    productId: string,
    shelfId: string,
  ): Promise<Product> {
    //Este código permite actualizar un producto, asociándolo con un estante existente en la bd
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const shelf = await this.shelfService.getByID(shelfId);
    if (!shelf) {
      throw new NotFoundException('Estante no encontrado');
    }

    product.shelf = shelfId;
    return product.save();
  }

  //eliminar el producto solo por ID, luego retorna ese producto eliminado
  async delete(productID: string): Promise<Product> {
    //el metodo busca por ID y lo elimina
    return await this.productRepository.remove(productID);
  }
  //para actualizar el producto, 2 parametros:buscar el producto por ID y crear
  async update(
    productID: string,
    updateProductData: UpdateProductDTO,
  ): Promise<Product> {
    //actualiza el producto con ambos parametros y lo actualiza por ID; luego lo retorna
    return await this.productRepository.modify(productID, updateProductData);
  }
}
