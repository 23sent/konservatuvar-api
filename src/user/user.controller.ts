import { Controller, UseGuards, Get, ParseIntPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { UserService } from './user.service';
import { User } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('exercises')
  getExercisesOfUser(@User('id', ParseIntPipe) user_id: any) {
    return this.userService.getExercisesOfUser(user_id);
  }

  @Get('')
  @UseGuards(JwtGuard)
  getUserInfo(@User('id', ParseIntPipe) user_id: any) {
    return this.userService.getUserInfo(user_id);
  }
}
