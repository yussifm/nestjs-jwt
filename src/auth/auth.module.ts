import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStratagy, RtStratagy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AtStratagy, RtStratagy],
  controllers: [AuthController],
})
export class AuthModule {}
