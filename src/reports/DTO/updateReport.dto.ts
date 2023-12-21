import { PartialType } from "@nestjs/swagger";
import { CreateReportDTO } from "./createReport.dto";


export class UpdateReportDTO extends PartialType(CreateReportDTO) {}