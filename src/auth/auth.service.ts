import { Secret } from './../../node_modules/@types/jsonwebtoken/index.d';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtservics: JwtService) {}

  hashpassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtservics.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),

      this.jwtservics.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 15,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updataRtHash(userId: number, rt: string) {
    const hash = await this.hashpassword(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async signUpLocal(dto: AuthDto): Promise<Token> {
    const hashpass = await this.hashpassword(dto.password);
    const new_user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashpass,
      },
    });
    const tokens = await this.getTokens(new_user.id, new_user.email);
    await this.updataRtHash(new_user.id, tokens.refresh_token);
    return tokens;
  }

  signInLocal() {}

  logOut() {}

  refreshToken() {}
}
