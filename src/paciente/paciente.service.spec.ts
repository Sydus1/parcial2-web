import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/paciente.entity';
import { Medico } from 'src/entities/medico.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PacienteService', () => {
  let service: PacienteService;
  let pacienteRepository: Repository<Paciente>;
  let medicoRepository: Repository<Medico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
    medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  it('debe buscar un Paciente por ID correctamente', async () => {
    const paciente = { id: '1', nombre: 'Juan Pérez', genero: 'Masculino', medicos: [] } as Paciente;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);

    const result = await service.findOne('1');
    expect(result).toEqual(paciente);
  });

  it('debe lanzar una excepción si el Paciente no existe', async () => {
    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('debe agregar un médico a un paciente correctamente', async () => {
    const paciente = { id: '1', nombre: 'Juan Pérez', genero: 'Masculino', medicos: [] } as Paciente;
    const medico = { id: '2', nombre: 'Dr. López', especialidad: 'Cardiología' } as Medico;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);
    jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
    jest.spyOn(pacienteRepository, 'save').mockResolvedValue({ ...paciente, medicos: [medico] });

    const result = await service.addMedicoToPaciente('1', '2');
    expect(result.medicos).toHaveLength(1);
    expect(result.medicos[0]).toEqual(medico);
  });

  it('debe lanzar una excepción si un paciente tiene más de 5 médicos asignados', async () => {
    const medicos = Array(5).fill({ id: '2', nombre: 'Dr. López', especialidad: 'Cardiología' } as Medico);
    const paciente = { id: '1', nombre: 'Juan Pérez', genero: 'Masculino', medicos } as Paciente;

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);

    await expect(service.addMedicoToPaciente('1', '6')).rejects.toThrow(BadRequestException);
  });
});