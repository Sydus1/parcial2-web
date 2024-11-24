import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from '../entities/medico.entity';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() medico: Partial<Medico>) {
    return this.medicoService.create(medico);
  }

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicoService.remove(id);
  }
}
