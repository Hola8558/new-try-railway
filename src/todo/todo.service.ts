import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, User } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateDTO } from './dtos/create-todo.dto';
import { UpdateTodoDto, UserDto } from './dtos/update-todo.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import * as request from 'supertest';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(Todo.name) private todoModel: Model<Todo>,
        @InjectModel(User.name) private userModel: Model<User>,
        private jwt: JwtService
    ){}

    //TASKS
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
        return await this.todoModel.find().exec();
    }

    async findOne (id: string){
        return this.todoModel.findById(id).exec();
    }

    async delete(id: string){
        return this.todoModel.findByIdAndDelete(id).exec();
    }

    //USERS
    async createUser(newUser: UserDto){
        const { pass } = newUser;
        newUser = {...newUser, pass: await hash(pass, 10)};
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }    

    async findAllUser (){
        return this.userModel.find().exec();
    }

    async loginUser(newUser: UserDto){
        const {email, pass} = newUser;
        const findUser = await this.userModel.findOne({email});
        if (!findUser) throw new HttpException('Usuario_no_encontrado', 404);
        const checkPassword = await compare(pass, findUser.pass);
        if(!checkPassword) throw new HttpException('Constraseña_incorrecta', 403);

        const payload = {id:findUser._id, name:findUser.email};
        const token = this.jwt.sign(payload);
        console.log(token)
        const data = {
            user: findUser,
            token
        };

        return data;
    }
}
