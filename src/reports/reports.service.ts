import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './DTO/report-entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './DTO/createReport.dto';
import { UpdateReportDTO } from './DTO/updateReport.dto';
import { UsersService } from 'src/users/users.service';
import { CurrentUserRequest } from 'src/appointments/appointments.service';
import { FilesService } from 'src/files/files.service';



@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly ReportsRepository: Repository<Report>,
    private UsersService: UsersService,
    private FilesService: FilesService
  ) {}


  async findAll(): Promise<Report[]> {
    return this.ReportsRepository.find({relations: {
      recipient: true,
      sender: true
    }})
  }


  async findSentReports(req: CurrentUserRequest): Promise<Report[]> {
    const currentUser = await this.UsersService.findOne(req.user.userId)
   return this.ReportsRepository.find({where: {sender: currentUser}, relations: {
    recipient: true
   }})
  }


  async findReciviedReports(req: CurrentUserRequest): Promise<Report[]> {
    const currentUser = await this.UsersService.findOne(req.user.userId)
    return this.ReportsRepository.find({where: {recipient: currentUser}, relations: {
      sender: true
    }})
  }


  async sentReport(body: CreateReportDTO, req: CurrentUserRequest, image: any): Promise<Report> {
    const imageName = await this.FilesService.createFile(image)
    const newReport = new Report()
    newReport.reportTitle = body.reportTitle
    newReport.medicalResearchData = body.medicalResearchData
    newReport.treatmentResults = body.treatmentResults
    newReport.doctorsComment = body.doctorsComment
    newReport.image = imageName
    const recipient = await this.UsersService.findOne(parseInt(body.recipientId))
    newReport.recipient = recipient
    const sender = await this.UsersService.findOne(req.user.userId)
    newReport.sender = sender
    return this.ReportsRepository.save(newReport)
  }


  async updateReport(id: number, body: UpdateReportDTO, req: CurrentUserRequest): Promise<Report> {
   const foundReport = await this.ReportsRepository.findOne({where: {id: id}, relations: {
    recipient: true
   }})
   if (!foundReport) {
    throw new NotFoundException({message: `Report with id ${id} not found`})
   }
   if (foundReport.sender.id !== req.user.userId) {
    throw new ForbiddenException({message: 'You can not update other`s users reports'})
   }
   foundReport.medicalResearchData = body.medicalResearchData
   foundReport.treatmentResults = body.treatmentResults
   foundReport.doctorsComment = body.doctorsComment
   const foundUser = await this.UsersService.findOne(req.user.userId)
   foundReport.recipient = foundUser
   return this.ReportsRepository.save(foundReport)
  }


  
}
