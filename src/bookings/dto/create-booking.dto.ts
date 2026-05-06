import { IsUUID, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  machineId: string;

  @IsISO8601()
  @IsNotEmpty()
  startTime: string;

  @IsISO8601()
  @IsNotEmpty()
  endTime: string;
}
