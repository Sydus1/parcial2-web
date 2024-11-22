import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from 'src/entities/paciente.entity';
import { Medico } from 'src/entities/medico.entity';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>,
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
    ) {}

    async create(paciente: Partial<Paciente>): Promise<Paciente> {
        if (paciente.nombre && paciente.nombre.length < 3) {
        throw new BadRequestException(
            'El nombre del paciente debe tener al menos 3 caracteres.',
        );
        }
        return this.pacienteRepository.save(paciente);
    }

    findAll(): Promise<Paciente[]> {
        return this.pacienteRepository.find({
        relations: ['medicos', 'diagnosticos'],
        });
    }

    async findOne(id: string): Promise<Paciente> {
        const paciente = await this.pacienteRepository.findOne({
        where: { id },
        relations: ['medicos', 'diagnosticos'],
        });
        if (!paciente) {
        throw new NotFoundException('El paciente no existe.');
        }
        return paciente;
    }

    async remove(id: string): Promise<void> {
        const paciente = await this.findOne(id);
        if (paciente.diagnosticos && paciente.diagnosticos.length > 0) {
        throw new BadRequestException(
            'No se puede eliminar un paciente con diagnósticos asociados.',
        );
        }
        await this.pacienteRepository.delete(id);
    }

    async addMedicoToPaciente(
        pacienteId: string,
        medicoId: string,
    ): Promise<Paciente> {
        const paciente = await this.findOne(pacienteId);
        const medico = await this.medicoRepository.findOneBy({ id: medicoId });

        if (!medico) {
        throw new NotFoundException('El médico no existe.');
        }

        if (paciente.medicos.length >= 5) {
        throw new BadRequestException(
            'Un paciente no puede tener más de 5 médicos asignados.',
        );
        }

        paciente.medicos.push(medico);
        return this.pacienteRepository.save(paciente);
    }
}
