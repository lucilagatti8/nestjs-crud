import { Injectable } from '@nestjs/common';
import { CreateShelfDTO } from './dto/create-shelf.dto';
import { UpdateShelfDTO } from './dto/update-shelf.dto';
import { Shelf } from './shelf.schema';
import { ShelfRepository } from './shelf.repository';

@Injectable()
export class ShelfService {
  // Inyectar el repositorio dentro del servicio
  constructor(private readonly shelfRepository: ShelfRepository) {}

  // Obtener todos los estantes
  async getAll(): Promise<Shelf[]> {
    // Busca todos los estantes que están cargados en la base de datos y los retorna
    return await this.shelfRepository.getAll(); // Cambié findAll() por getAll()
  }

  // Obtener un estante por ID
  async getByID(shelfID: string): Promise<Shelf> {
    // Busca un estante por ID en la base de datos y lo retorna
    return await this.shelfRepository.getByID(shelfID); // Cambié findById() por getByID()
  }

  // Crear un estante que vamos a guardar en la base de datos
  async create(createShelfDto: CreateShelfDTO): Promise<Shelf> {
    // Devuelve el estante creado
    return await this.shelfRepository.create(createShelfDto); // Cambié save() por create()
  }

  // Eliminar un estante por ID
  async delete(shelfID: string): Promise<Shelf> {
    // El método busca el estante por ID y lo elimina
    return await this.shelfRepository.delete(shelfID); // Cambié remove() por delete()
  }

  // Actualizar un estante por ID
  async update(
    shelfID: string,
    updateShelfDto: UpdateShelfDTO,
  ): Promise<Shelf> {
    // Actualiza el estante con los nuevos datos y lo retorna
    return await this.shelfRepository.update(shelfID, updateShelfDto); // Cambié modify() por update()
  }
}
