import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto";
import {Tokens} from "./types";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user
  }

  @Post('/login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @Post('/register')
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.register(dto)
  }

  @Get()
  getUsers() {
    return this.authService.getUsers()
  }
}
