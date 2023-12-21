import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, Doctors } from './DTO/appointment-entity';
import { CreateAppointmentDTO } from './DTO/create-appointment.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { Position } from 'src/positions/DTO/position-entity';
import { AttachAppointmentDTO } from './DTO/attach-appointment.dto';


export interface CurrentUserRequest extends Request {
user: {
  userId: number,
  positions: Position[]
}
}

@Injectable({scope: Scope.REQUEST})
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private AppointmentRepository: Repository<Appointment>,
    @Inject(REQUEST) private readonly request: CurrentUserRequest,
    private usersService: UsersService
  ) {}


  async getAppointments() {
    return this.AppointmentRepository.find({relations: {
      patient: true
    }})
  }


  async insertAppointment(body: CreateAppointmentDTO) {
    const currentUser = await this.usersService.findOne(this.request.user.userId)
  const newUser = new Appointment()
  newUser.requestedDoctor = body.requstedDoctor
  newUser.patientComment = body.patientComment
  newUser.patient = currentUser
  return this.AppointmentRepository.save(newUser)
  }



  async attachAppointmentToTheDoctor(body: AttachAppointmentDTO) {
  const foundAppointment = await this.AppointmentRepository.findOne({where: {id: body.appointmentId}})
  if (!foundAppointment) {
    throw new NotFoundException({message: `Appointment with id ${body.appointmentId} not found`})
  }
  foundAppointment.date = body.appointmentDate
  const foundDoctor = await this.usersService.findOneWithRelations(body.doctorId)
  foundAppointment.doctor = foundDoctor
  this.AppointmentRepository.save(foundAppointment)
  return foundAppointment
  }



  async deleteAppointment(id: number) {
    const result = await this.checkIfUserIsOperator()
    if (!result) {
      const currentAppointment = await this.AppointmentRepository.findOne({where: {id: id}, relations: {
        patient: true
      }})
      if (!currentAppointment) {
        throw new NotFoundException({message: `Appointment with id ${id} not found`})
      }
      if (currentAppointment.patient.id !== this.request.user.userId) {
       throw new ForbiddenException({message: 'You dont have right to delete other`s users appointments'})
      }
    }
  const deletedAppointment = await this.AppointmentRepository.delete({id: id})
  if (deletedAppointment.affected === 0) {
    throw new NotFoundException({message: `Appointment with id ${id} not found`})
  }
  return new HttpException(`Appointment has been deleted successfully`, HttpStatus.NO_CONTENT)
  }





  private async checkIfUserIsOperator() {
    const positions = this.request.user.positions
    for (let obj of positions) {
      if (obj.value == 'OPERATOR', 'HEAD PHYSICIAN') {
        return true
        } else return false}
  }


}
