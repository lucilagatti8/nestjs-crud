import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Response } from 'express'; // Asegúrate de importar el tipo Response si usas @Res()
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Método para traer todos los productos
  @Get('/')
  async getProducts(@Res() res: Response) {
    const products = await this.productService.getAll();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  // Método para traer solo un producto por su ID
  @Get('/:productID')
  async getProduct(
    @Param('productID') productID: string,
    @Res() res: Response,
  ) {
    const product = await this.productService.getByID(productID);
    if (!product) throw new NotFoundException('Producto no existente');
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  // Método para eliminar un producto
  @Delete('/')
  async deleteProduct(
    @Query('productID') productID: string,
    @Res() res: Response,
  ) {
    const productDeleted = await this.productService.delete(productID);
    if (!productDeleted) throw new NotFoundException('Producto no existente');
    return res.status(HttpStatus.OK).json({
      message: 'Producto eliminado con éxito',
      productDeleted,
    });
  }

  // Método para actualizar un producto
  @Put('/:productID')
  async updateProduct(
    @Param('productID') productID: string,
    @Body() updateProductDTO: UpdateProductDTO,
    @Res() res: Response,
  ) {
    const updatedProduct = await this.productService.update(
      productID,
      updateProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Producto no existente');
    return res.status(HttpStatus.OK).json({
      message: 'Producto actualizado con éxito',
      updatedProduct,
    });
  }

  // Método para crear un producto nuevo
  @Post('/')
  async createPost(
    @Body() createProductDTO: CreateProductDTO,
    @Res() res: Response,
  ) {
    const product = await this.productService.create(createProductDTO);
    return res.status(HttpStatus.CREATED).json({
      // Cambiado a CREATED
      message: 'Producto creado con éxito',
      product,
    });
  }

  // Asignar un estante a un producto recién creado
  @Put('/:productId/shelf/:shelfId') // Cambié el endpoint para que sea más explícito
  async assignShelfToProduct(
    @Param('productId') productId: string,
    @Param('shelfId') shelfId: string,
    @Res() res: Response,
  ) {
    const updatedProduct = await this.productService.assignShelfToProduct(
      productId,
      shelfId,
    );
    if (!updatedProduct) {
      throw new NotFoundException('Producto o estante no encontrado');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Estante asignado al producto con éxito',
      updatedProduct,
    });
  }
}
