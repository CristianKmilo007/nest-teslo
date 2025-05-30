import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

  @IsPositive()
  @IsOptional()
  @Type(()=>Number) // esto es igual que la configuracion global en main enableImplicitConversion: true
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(()=>Number)
  offset?: number

}