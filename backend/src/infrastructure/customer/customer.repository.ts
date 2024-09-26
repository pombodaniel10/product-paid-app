import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../domain/entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async findById(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ email });
    }

    async create(customer: Customer): Promise<Customer> {
        return this.customerRepository.save(customer);
    }
}