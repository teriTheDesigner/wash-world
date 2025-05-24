import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, AuthGuard, AdminGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, JwtModule, AdminGuard, UserModule],
})
export class AuthModule {}
