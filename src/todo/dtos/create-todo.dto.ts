import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { TodoStatus } from "../schemas/todo.schema";

export class CreateDTO{
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    @IsOptional()
    decription: string;
    @IsEnum(TodoStatus)
    status?: TodoStatus;
}