import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}.axtmvr7.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,), TodoModule,         
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
