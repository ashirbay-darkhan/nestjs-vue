import {Injectable} from '@nestjs/common';
import {User} from "./users.model";
const users = require('../users.json')

@Injectable()
export class UsersService {

  async getUsers() {
    return [...users]
  }

  async getUser(id: string) {
    try {
      return this.getUserById(id)[0]
    } catch (e) {
      return {
        msg: "Not found"
      }
    }
  }

  private getUserById(id: string): [User, string] {
    const index = users.findIndex(u => u.id === id)
    return [users[index], index]
  }

  async updateUser(
    id: string,
    name: string,
    phone: string,
    address: string,
    info: string,
    email: string,
    password: string,
  ) {
    const [targetUser, index] = this.getUserById(id)
    const newUser: User = {...targetUser, name, phone, address, info, email, password}
    users[index] = newUser
    return {
      newUser,
      msg: "User updated"
    }
  }

  async deleteUser(id: string) {
    const [_, index] = this.getUserById(id)
    users.splice(index, 1)
  }
}
