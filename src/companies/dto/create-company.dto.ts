import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Address can not be empty' })
  address: string;

  @IsNotEmpty({ message: 'Description can not be empty' })
  description: string;
}
