import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoController } from './medico/medico.controller';
import { MedicoService } from './medico/medico.service';
import { PacienteController } from './paciente/paciente.controller';
import { PacienteService } from './paciente/paciente.service';
import { DiagnosticoController } from './diagnostico/diagnostico.controller';
import { DiagnosticoService } from './diagnostico/diagnostico.service';
import { Medico } from './entities/medico.entity';
import { Paciente } from './entities/paciente.entity';
import { Diagnostico } from './entities/diagnostico.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Medico, Paciente, Diagnostico],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Medico, Paciente, Diagnostico]),
  ],
  controllers: [MedicoController, PacienteController, DiagnosticoController],
  providers: [MedicoService, PacienteService, DiagnosticoService],
})
export class AppModule {}
