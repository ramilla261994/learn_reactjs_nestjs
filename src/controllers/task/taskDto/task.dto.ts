import { IsDate, IsDateString, IsEnum, IsNotEmpty, isNotEmpty, IsString, isString, Length } from "class-validator";

export class TaskDto{

    @IsString()
    id: string;

    @IsNotEmpty({message : 'The task should have a title'})
    taskName: string;

    @IsNotEmpty({message : 'Please provide task type'})
    taskType: string;

    @IsNotEmpty({message : 'value should be greater than 4 and less than 256'})
    @Length(4, 255)
    description: string;

    @IsDateString()
    createdOn: string;

    @IsDateString()
    updatedOn: string;
}