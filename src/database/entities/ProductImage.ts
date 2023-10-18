import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { Product } from "./Product";

@Index("product_image_pkey", ["id"], { unique: true })
@Entity("product_image", { schema: "public" })
@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: string;

  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
