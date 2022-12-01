import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "./dto";
import {Tokens} from "./types";
import {JwtService} from "@nestjs/jwt";
import {v4 as uuidv4} from 'uuid'
const users = require('../users.json')


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getUsers() {
    return users
  }

  async login(dto: AuthDto) {
    const user = users.find(_user => _user.email === dto.email)
    if (!user) throw new UnauthorizedException('Credentials incorrect')
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect')

    const tokens = await this.getTokens(user.id, user.email)
    return tokens
  }

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.signAsync({
      sub: userId,
      email: email,
      type: type
    }, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: 60
    })
  }

  async register(dto: AuthDto): Promise<Tokens> {
    const id = uuidv4()
    // const hash = await this.hashData(dto.password)

    const candidate = await this.findOne(dto.email)
    if (candidate)
      throw new Error(`Пользователь с почтовым адресом ${dto.email} уже существует`)

    const tokens = await this.getTokens(id, dto.email)
    users.push({id, ...dto})
    return tokens
  }

  async findOne(email: string) {
    return users.find(user => user.email === email)
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.sign({
        sub: userId,
        email: email,
      }, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: 60
      }),
      this.jwtService.sign({
        sub: userId,
        email: email,
      }, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: 60 * 15
      })
    ])

    return {
      access_token: at,
      refresh_token: rt
    }
  }
}
