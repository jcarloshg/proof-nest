import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users: { username: string; password: string }[] = [];

  signUp(username: string, password: string) {
    const userExists = this.users.some(u => u.username === username);
    if (userExists) {
      return { message: 'User already exists' };
    }
    this.users.push({ username, password });
    return { message: 'User registered successfully' };
  }

  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful' };
  }
}
