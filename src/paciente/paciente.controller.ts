import { Controller, Post, Param } from '@nestjs/common';
import { PacienteService } from './paciente.service';

@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}

    @Post(':pacienteId/medico/:medicoId')
    addMedicoToPaciente(
        @Param('pacienteId') pacienteId: string,
        @Param('medicoId') medicoId: string,
    ) {
        return this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
    }
}
