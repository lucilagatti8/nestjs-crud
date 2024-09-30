export interface Product {
  shelf: string;
  save: any;

  readonly name: String;
  readonly description: String;
  readonly imageURL: String;
  readonly price: Number;
  readonly createdAt: Date;
}
