import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from '../otp/otp.entity';
import { User } from '../user/user.entity';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: Number(config.get<string>('EMAIL_PORT')),
          secure: true,
          auth: {
            user: config.get<string>('EMAIL_USERNAME'),
            pass: config.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Fupartment Store" ${config.get<string>('EMAIL_HOST')}`,
        },
        template: {
          dir: `${process.cwd()}/src/templates`,
          adapter: new HandlebarsAdapter(undefined, {
            inlineCssEnabled: true,
          }),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmModule.forFeature([User, Otp]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
