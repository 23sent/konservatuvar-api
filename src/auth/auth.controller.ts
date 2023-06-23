import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, SignInUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinUserDto: SignInUserDTO) {
    return this.authService.signin(signinUserDto);
  }

  @Post('signup')
  singup(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signup(createUserDto);
  }
}
