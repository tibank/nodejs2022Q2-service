import { User } from 'src/users/entities/user.entity';

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async addUser(user: User): Promise<Number> {
    this.users.push(user);
    return 1;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: String): Promise<User> {
    return this.users.find((item: User) => item.id === id);
  }

  async updateUser(user: User): Promise<Number> {
    const index = this.users.findIndex((item: User) => item.id === user.id);
    if (~index) {
      this.users[index] = user;
      return 1;
    }
    return 0;
  }

  async deleteUser(id: String): Promise<Number> {
    const index = this.users.findIndex((item: User) => item.id === id);

    if (~index) {
      this.users = this.users.filter((item: User) => item.id !== id);
      return 1;
    }

    return 0;
  }
}

export const userRepository = new UserRepository();
