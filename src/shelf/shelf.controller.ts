import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDTO } from './dto/create-shelf.dto';
import { UpdateShelfDTO } from './dto/update-shelf.dto';

@Controller('shelfs')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  // Crear una nueva estantería/estante
  @Post('/')
  async createShelf(@Body() createShelfDto: CreateShelfDTO) {
    const shelf = await this.shelfService.create(createShelfDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Estante creado con éxito',
      shelf,
    };
  }

  // Obtener todos los estantes
  @Get('/')
  async getAll() {
    const shelves = await this.shelfService.getAll();
    return {
      statusCode: HttpStatus.OK,
      shelves,
    };
  }

  // Obtener un estante por su ID
  @Get('/:shelfID')
  async getByID(@Param('shelfID') shelfId: string) {
    const shelf = await this.shelfService.getByID(shelfId);
    if (!shelf) throw new NotFoundException('Estante no encontrado');
    return {
      statusCode: HttpStatus.OK,
      shelf,
    };
  }

  // Actualizar un estante
  @Put('/')
  async updateShelf(
    @Query('shelfID') shelfID: string,
    @Body() updateShelfDto: UpdateShelfDTO,
  ) {
    const updatedShelf = await this.shelfService.update(
      shelfID,
      updateShelfDto,
    );
    if (!updatedShelf) throw new NotFoundException('Estante no encontrado');
    return {
      statusCode: HttpStatus.OK,
      message: 'Estante actualizado con éxito',
      updatedShelf,
    };
  }

  // Eliminar un estante
  @Delete('/')
  async deleteShelf(@Query('shelfID') shelfID: string) {
    const shelfDeleted = await this.shelfService.delete(shelfID);
    if (!shelfDeleted) throw new NotFoundException('Estante no encontrado');
    return {
      statusCode: HttpStatus.OK,
      message: 'Estante eliminado con éxito',
      shelfDeleted,
    };
  }
}
