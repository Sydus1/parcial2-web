import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/paciente.entity';
import { BadRequestException } from '@nestjs/common';

describe('PacienteService', () => {
    let service: PacienteService;
    let pacienteRepository: Repository<Paciente>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            PacienteService,
            {
            provide: getRepositoryToken(Paciente),
            useClass: Repository,
            },
        ],
        }).compile();

        service = module.get<PacienteService>(PacienteService);
        pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
    });

    it('debe crear un Paciente correctamente', async () => {
        const pacienteData = { nombre: 'Juan Pérez', genero: 'Masculino' };

        // Mock del método save del repositorio
        jest.spyOn(pacienteRepository, 'save').mockResolvedValue(pacienteData as Paciente);

        const result = await service.create(pacienteData);

        expect(result).toEqual(pacienteData);
        expect(pacienteRepository.save).toHaveBeenCalledWith(pacienteData);
    });

    it('debe lanzar una excepción si el nombre del paciente tiene menos de 3 caracteres', async () => {
        const pacienteData = { nombre: 'Jo', genero: 'Masculino' };

        // La prueba espera que el servicio lance una excepción de tipo BadRequestException
        await expect(service.create(pacienteData)).rejects.toThrow(BadRequestException);

        // No se debe llamar al método save del repositorio porque no pasa la validación
        expect(pacienteRepository.save).not.toHaveBeenCalled();
    });
});
