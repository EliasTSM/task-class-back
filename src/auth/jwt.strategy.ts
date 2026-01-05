/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  type JwtFromRequestFunction,
  type StrategyOptions,
} from 'passport-jwt';

type Role = 'admin' | 'student';

type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtFromRequest =
      ExtractJwt.fromAuthHeaderAsBearerToken() as unknown as JwtFromRequestFunction;

    const options: StrategyOptions = {
      jwtFromRequest,
      secretOrKey: process.env.JWT_SECRET ?? 'taskClass',
      ignoreExpiration: false,
    };

    super(options);
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
