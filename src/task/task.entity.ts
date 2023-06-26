import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Description cannot be empty' })
    description?: string;

    @Column({ default: false })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    @IsOptional()
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsOptional()
    updatedAt?: Date;
}
