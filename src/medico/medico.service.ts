import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from 'src/entities/medico.entity';

@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
    ) {}

    async create(medico: Partial<Medico>): Promise<Medico> {
        // Validaciones
        if (!medico.nombre || !medico.especialidad) {
        throw new BadRequestException('El nombre y la especialidad son obligatorios.');
        }
        return this.medicoRepository.save(medico);
    }

    findAll(): Promise<Medico[]> {
        return this.medicoRepository.find({ relations: ['pacientes'] });
    }

    async findOne(id: string): Promise<Medico> {
        const medico = await this.medicoRepository.findOne({
        where: { id },
        relations: ['pacientes'],
        });
        if (!medico) {
        throw new NotFoundException('El médico no existe.');
        }
        return medico;
    }

    async remove(id: string): Promise<void> {
        const medico = await this.findOne(id);
        if (medico.pacientes && medico.pacientes.length > 0) {
        throw new BadRequestException('No se puede eliminar un médico con pacientes asociados.');
        }
        await this.medicoRepository.delete(id);
    }
}
