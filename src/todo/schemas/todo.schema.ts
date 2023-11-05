import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TodoStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

@Schema()
export class Todo {
    @Prop({required : true})
    title: string;
    @Prop()
    decription: string;
    @Prop({ default: TodoStatus.PENDING })
    status: TodoStatus;
}

export const  TodoSchema = SchemaFactory.createForClass(Todo);

@Schema()
export class User {
    @Prop({required : true})
    email: string;
    @Prop({required : true})
    pass: string;
}

export const  UserSchema  = SchemaFactory.createForClass(User);