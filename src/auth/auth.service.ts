import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUpLocal(dto: AuthDto) {}

  signInLocal() {}

  logOut() {}

  refreshToken() {}
}
