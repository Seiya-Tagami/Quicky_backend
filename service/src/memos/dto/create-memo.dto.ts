import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  link: string;
}
