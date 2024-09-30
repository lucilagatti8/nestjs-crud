import { PartialType } from '@nestjs/mapped-types';
import { Shelf } from '../shelf.schema';

export class CreateShelfDTO extends PartialType(Shelf) {}
