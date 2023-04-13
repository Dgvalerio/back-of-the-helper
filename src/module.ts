import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from '@/controller';
import { GithubModule } from '@/github/module';
import { TimesheetModule } from '@/timesheet/module';
import { UserModule } from '@/user/module';

import { join } from 'path';
import * as process from 'process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    GithubModule,
    TimesheetModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
