import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostico } from 'src/entities/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
    constructor(
      @InjectRepository(Diagnostico)
      private diagnosticoRepository: Repository<Diagnostico>,
    ) {}

    async create(diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {
      // Validación
      if (diagnostico.descripcion && diagnostico.descripcion.length > 200) {
        throw new BadRequestException('La descripción no puede exceder 200 caracteres.');
      }
      return this.diagnosticoRepository.save(diagnostico);
    }

    findAll(): Promise<Diagnostico[]> {
      return this.diagnosticoRepository.find({ relations: ['paciente'] });
    }

    async findOne(id: string): Promise<Diagnostico> {
      const diagnostico = await this.diagnosticoRepository.findOne({
        where: { id },
        relations: ['paciente'],
      });
      if (!diagnostico) {
        throw new NotFoundException('El diagnóstico no existe.');
      }
      return diagnostico;
    }

    async remove(id: string): Promise<void> {
      await this.findOne(id); // Verifica que existe
      await this.diagnosticoRepository.delete(id);
    }
}
