import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

import { ProductImage } from "./ProductImage";
/*import { TrackPromotion } from "./TrackPromotion";
  import { PromoProduct } from "./PromoProduct"; 
  import { Shop } from "./Shop";
  import { OrderItem } from "./OrderItem";
  */

@Index("product_pkey", ["id"], { unique: true })
@Entity("product", { schema: "public" })
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  shop_id: string;

  @Column()
  category_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 6 })
  discount_price: number;

  @Column()
  tax: number;

  @Column({ default: "pending" })
  admin_status: string;

  @Column({ default: false })
  is_published: boolean;

  @Column()
  currency: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  /*  @OneToMany(() => TrackPromotion, (trackPromotion) => trackPromotion.product)
    trackPromotions: TrackPromotion[];
  
    @OneToMany(() => PromoProduct, (promoProduct) => promoProduct.product)
    promoProducts: PromoProduct[];
  
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[]; 
    
    @ManyToOne(() => Shop, (shop) => shop.products)
    shop: Shop;
  */
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
