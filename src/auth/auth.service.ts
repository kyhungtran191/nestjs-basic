import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  //   username , email return from Passport
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(email);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid) return user;
    }
    return null;
  }
  async login(user: IUser) {
    const { _id, email, name, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      email,
      name,
      role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      email,
      name,
      role,
    };
  }
}
