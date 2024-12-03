import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title?: string;
}
