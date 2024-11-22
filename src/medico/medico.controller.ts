import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from 'src/entities/medico.entity';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @Get()
    findAll(): Promise<Medico[]> {
        return this.medicoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Medico> {
        return this.medicoService.findOne(id);
    }

    @Post()
    create(@Body() medico: Partial<Medico>): Promise<Medico> {
        return this.medicoService.create(medico);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.medicoService.remove(id);
    }
}
