import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserSettingDto {
  @IsNotEmpty()
  @IsBoolean()
  smsEnabled: boolean;

  @IsNotEmpty()
  @IsBoolean()
  notificationsOn: boolean;
}
