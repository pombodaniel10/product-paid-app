import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../../domain/entities/transaction.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}

    async getTransaction(transactionId: string): Promise<any | null> {
        return this.transactionRepository.findBy({ transaction_id: transactionId });
    }

    async saveTransaction(transaction: Transaction): Promise<Transaction> {
        return this.transactionRepository.save(transaction);
    }

    async updateTransaction(transactionId: string, updateData: Partial<Transaction>): Promise<UpdateResult> {
        return this.transactionRepository.update({ transaction_id: transactionId }, updateData);
      }
    
}