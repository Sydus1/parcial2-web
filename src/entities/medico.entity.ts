import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Paciente } from './paciente.entity';

@Entity()
export class Medico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    especialidad: string;

    @Column()
    telefono: string;

    @ManyToMany(() => Paciente, (paciente) => paciente.medicos, { cascade: true })
    @JoinTable() // Relación intermedia
    pacientes: Paciente[];
}