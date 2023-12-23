import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Public, RequiredPositions } from 'src/auth/DTO/constant';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './DTO/create-appointment.dto';
import { Request } from 'express';
import { AttachAppointmentDTO } from './DTO/attach-appointment.dto';
import { PositionsGuard } from 'src/auth/positionsGuard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './DTO/appointment-entity';
import { User } from 'src/users/DTO/user-entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
constructor(private readonly AppointmentsService: AppointmentsService) {
}

@ApiOperation({summary: 'Finds all appointments'})
@ApiResponse({status: 200, type: [Appointment]})
@RequiredPositions('OPERATOR', 'HEAD PHYSICIAN')
@UseGuards(PositionsGuard)
@Get()
getAppointments() {
  return this.AppointmentsService.getAppointments()
}

@ApiOperation({summary: 'Inserts appointment to the appointments table'})
@ApiResponse({status: 200, type: Appointment})
@Post()
insertAppointment(@Body() body: CreateAppointmentDTO) {
return this.AppointmentsService.insertAppointment(body)
}

@ApiOperation({summary: 'Attaches appointments to the specifed doctor'})
@ApiResponse({status: 200, type: User})
@RequiredPositions('OPERATOR')
@UseGuards(PositionsGuard)
@Patch()
attachAppointmentToTheDoctor(@Body() body: AttachAppointmentDTO) {
  return this.AppointmentsService.attachAppointmentToTheDoctor(body)
}


@ApiOperation({summary: 'Deletes specified appointment'})
@ApiResponse({status: 204, type: HttpException})
@Delete(':id')
@RequiredPositions('DOCTORS')
@UseGuards(PositionsGuard)
deleteAppointment(@Param('id', ParseIntPipe) id: number) {
  return this.AppointmentsService.deleteAppointment(id)
}
}
