import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, SignInUserDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDTO) {
    const hash: string = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;

    const check_user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (check_user) {
      throw new HttpException(
        'User already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        last_login_at: new Date(),
      },
    });

    const token = await this.signToken(user.id, user.email);
    delete user.password;

    const answers = await this.prisma.userQuestionAccuracy.findMany({
      where: {
        user_id: user.id,
      },
    });

    let total_accuracy = 0;
    let total_answers = 0;
    for (let event of answers) {
      total_answers += event.answer_count;
      total_accuracy += event.accuracy;
    }

    return {
      user: {
        ...user,
        accuracy: total_accuracy,
        answer_count: total_answers,
      },
      token,
    };
  }

  async signin(signinUserDto: SignInUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signinUserDto.email,
      },
    });

    if (!user) {
      throw new HttpException('User not exists.', HttpStatus.BAD_REQUEST);
    }

    const match = await bcrypt.compare(
      signinUserDto.password,
      user.password,
    );

    if (!match) {
      throw new HttpException('Wrong password.', HttpStatus.BAD_REQUEST);
    }

    const token = await this.signToken(user.id, user.email);
    delete user.password;

    const answers = await this.prisma.userQuestionAccuracy.findMany({
      where: {
        user_id: user.id,
      },
    });

    let total_accuracy = 0;
    let total_answers = 0;
    for (let event of answers) {
      total_answers += event.answer_count;
      total_accuracy += event.accuracy;
    }

    return {
      user: {
        ...user,
        accuracy: total_accuracy,
        answer_count: total_answers,
      },
      token,
    };
  }

  async signToken(user_id: number, email: string) {
    const payload = {
      sub: user_id,
      email: email,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
  }
}
