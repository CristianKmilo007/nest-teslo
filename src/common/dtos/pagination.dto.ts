import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

  @ApiProperty({
    description: 'Number of items to return',
    default: 10,
    required: false,
  })
  @IsPositive()
  @IsOptional()
  @Type(()=>Number) // esto es igual que la configuracion global en main enableImplicitConversion: true
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Min(0)
  @Type(()=>Number)
  offset?: number

}