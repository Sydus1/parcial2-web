import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from 'src/entities/diagnostico.entity';

@Controller('diagnostico')
export class DiagnosticoController {
    constructor(private readonly diagnosticoService: DiagnosticoService) {}

    @Get()
    findAll(): Promise<Diagnostico[]> {
      return this.diagnosticoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Diagnostico> {
      return this.diagnosticoService.findOne(id);
    }

    @Post()
    create(@Body() diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {
      return this.diagnosticoService.create(diagnostico);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.diagnosticoService.remove(id);
    }
}
