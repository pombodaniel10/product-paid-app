import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  
  @Column()
  last_name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  credit_card_token: string;
}