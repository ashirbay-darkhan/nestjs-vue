import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers()
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId)
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('info') info: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.updateUser(id, name, phone, address, info, email, password)
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    this.userService.deleteUser(userId)
  }
}
