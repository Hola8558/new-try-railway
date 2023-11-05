import { Controller, Post, Delete, Get, Put, Body, ValidationPipe, Param, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateDTO } from './dtos/create-todo.dto';
import { UpdateTodoDto, UserDto } from './dtos/update-todo.dto';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService){}


    //TASKS
    @Post()
    async create(@Body(new ValidationPipe) createdTodo: CreateDTO){
        return this.todoService.create(createdTodo);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe) updeatedTodo: UpdateTodoDto){
        return this.todoService.update(id, updeatedTodo);
    }

    @Get()
    async findAll(){
        return this.todoService.findAll();
    }

    @Get()
    async findAll2(){
        return this.todoService.findAll();
    }

    @Get(':id')
    async findOne (@Param('id') id: string){
        return this.todoService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.todoService.delete(id);
    }

    //USERS
    @Post('/newUser')
    async createUser(@Body(new ValidationPipe) createdUser: UserDto){
        return this.todoService.createUser(createdUser);
    }

    @Post('/login')
    async loginUser(@Body(new ValidationPipe) createdUser: UserDto){
        return this.todoService.loginUser(createdUser);
    }
}
