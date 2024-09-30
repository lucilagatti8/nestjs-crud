import { Injectable } from '@nestjs/common';
import { CreateShelfDTO } from './dto/create-shelf.dto';
import { UpdateShelfDTO } from './dto/update-shelf.dto';
import { Shelf } from './shelf.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ShelfRepository {
  constructor(
    @InjectModel(Shelf.name) private readonly shelfModel: Model<Shelf>,
  ) {}

  // Crear un nuevo estante
  async create(createShelfDto: CreateShelfDTO): Promise<Shelf> {
    const newShelf = new this.shelfModel(createShelfDto);
    return await newShelf.save();
  }

  // Obtener todos los estantes
  async getAll(): Promise<Shelf[]> {
    return await this.shelfModel.find();
  }

  // Obtener un estante por su ID
  async getByID(shelfID: string): Promise<Shelf> {
    return await this.shelfModel.findById(shelfID);
  }

  // Actualizar un estante por ID
  async update(
    shelfID: string,
    updateShelfDto: UpdateShelfDTO,
  ): Promise<Shelf> {
    return await this.shelfModel.findByIdAndUpdate(shelfID, updateShelfDto, {
      new: true,
    });
  }

  // Eliminar un estante por ID
  async delete(shelfID: string): Promise<Shelf> {
    return await this.shelfModel.findByIdAndDelete(shelfID);
  }
}
