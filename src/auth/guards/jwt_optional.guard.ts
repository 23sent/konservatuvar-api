import { AuthGuard } from '@nestjs/passport';

// Jwt guard to avoid exceptions.
export class JwtOptional extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    return user;
  }
}
