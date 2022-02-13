import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto';
import { Token } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('/signup')
  sign_up_local(@Body() dto: AuthDto): Promise<Token> {
    return this.authservice.signUpLocal(dto);
  }

  @Post('/signin')
  sign_in_local() {
    return this.authservice.signInLocal();
  }

  @Post('/logout')
  log_out() {
    return this.authservice.logOut();
  }

  @Post('/refresh')
  refresh_token() {
    return this.authservice.refreshToken();
  }
}
