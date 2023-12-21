import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './DTO/createReport.dto';
import { UpdateReportDTO } from './DTO/updateReport.dto';
import { PositionsGuard } from 'src/auth/positionsGuard';
import { RequiredPositions } from 'src/auth/DTO/constant';
import { CurrentUserRequest } from 'src/appointments/appointments.service';
import { FileInterceptor } from '@nestjs/platform-express';
const doctors = ['CARDIOLOGIST', 'THERAPIST']

@Controller('reports')
export class ReportsController {
  constructor(private ReportsService: ReportsService) {

  }



  @RequiredPositions('HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Get()
  findAll() {
    return this.ReportsService.findAll()
  }


  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Get('/sent')
  findSentReports(@Req() req: CurrentUserRequest) {
    return this.ReportsService.findSentReports(req)
  }


  @Get('/recivied')
  findReciviedReports(@Req() req: CurrentUserRequest) {
    return this.ReportsService.findReciviedReports(req)
  }


  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  sentReport(@Body() body: CreateReportDTO, @UploadedFile() image: any, @Req() req: CurrentUserRequest) {
    return this.ReportsService.sentReport(body, req, image)
  }


  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Patch(':id')
  updateReport(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateReportDTO, @Req() req: CurrentUserRequest) {
return this.ReportsService.updateReport(id, body, req)
  }
}
