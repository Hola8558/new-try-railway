import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema, User, UserSchema } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Todo.name,
            schema: TodoSchema
        }]),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            secret: 'secretoSuperAjente',
            signOptions: {expiresIn : '2h'}
        })
    ],
    providers: [TodoService],
    controllers: [TodoController]
})
export class TodoModule {}
