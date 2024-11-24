import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from '../entities/paciente.entity';

@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Post()
    @HttpCode(201)
    create(@Body() paciente: Partial<Paciente>) {
      return this.pacienteService.create(paciente);
    }

    @Get()
    findAll() {
      return this.pacienteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.pacienteService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.pacienteService.remove(id);
    }

    @Post(':pacienteId/medico/:medicoId')
    addMedicoToPaciente(
      @Param('pacienteId') pacienteId: string,
      @Param('medicoId') medicoId: string,
    ) {
      return this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
    }
}