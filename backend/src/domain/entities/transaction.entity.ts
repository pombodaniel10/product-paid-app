import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: string;

  @Column('decimal')
  amount: number;

  @Column()
  payment_status: string;

  @Column()
  product_id: number;

  @Column()
  customer_id: number;

}