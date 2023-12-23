import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDTO } from './DTO/createReport.dto';
import { UpdateReportDTO } from './DTO/updateReport.dto';
import { PositionsGuard } from 'src/auth/positionsGuard';
import { RequiredPositions } from 'src/auth/DTO/constant';
import { CurrentUserRequest } from 'src/appointments/appointments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
const doctors = ['CARDIOLOGIST', 'THERAPIST']

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private ReportsService: ReportsService) {

  }



  @ApiOperation({summary: 'Finds all reports'})
  @ApiResponse({status: 200, type: HttpException})
  @RequiredPositions('HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Get()
  findAll() {
    return this.ReportsService.findAll()
  }


  @ApiOperation({summary: 'Finds all sent reports of current users'})
  @ApiResponse({status: 200, type: HttpException})
  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Get('/sent')
  findSentReports(@Req() req: CurrentUserRequest) {
    return this.ReportsService.findSentReports(req)
  }


  @ApiOperation({summary: 'Finds all recivied reports of current user'})
  @ApiResponse({status: 200, type: HttpException})
  @Get('/recivied')
  findReciviedReports(@Req() req: CurrentUserRequest) {
    return this.ReportsService.findReciviedReports(req)
  }


  @ApiOperation({summary: 'Creates and sents report to the specified user'})
  @ApiResponse({status: 200, type: HttpException})
  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  sentReport(@Body() body: CreateReportDTO, @UploadedFile() image: any, @Req() req: CurrentUserRequest) {
    return this.ReportsService.sentReport(body, req, image)
  }


  @ApiOperation({summary: 'Updates report of current user'})
  @ApiResponse({status: 200, type: HttpException})
  @RequiredPositions('DOCTORS')
  @UseGuards(PositionsGuard)
  @Patch(':id')
  updateReport(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateReportDTO, @Req() req: CurrentUserRequest) {
return this.ReportsService.updateReport(id, body, req)
  }
}
