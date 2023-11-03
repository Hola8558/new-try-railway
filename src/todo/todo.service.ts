import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateDTO } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import * as request from 'supertest';

@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>){}

    async create(todo: CreateDTO){
        const createdTodo = new this.todoModel(todo);
        return createdTodo.save();
    }

    async update(is: string, todo:UpdateTodoDto){
        return this.todoModel.findByIdAndUpdate(is, todo,{
            new:true,
        }). exec();
    }

    async findAll(){
        return this.todoModel.find().exec();
    }

    async findOne (id: string){
        return this.todoModel.findById(id).exec();
    }

    async delete(id: string){
        return this.todoModel.findByIdAndDelete(id).exec();
    }
    
}
