import { PartialType } from '@nestjs/mapped-types';
import { Shelf } from '../shelf.schema';

export class UpdateShelfDTO extends PartialType(Shelf) {}
