import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getFirstUser() {
    return this.prisma.user.findFirst({
      omit: {
        password: true,
      },
    });
  }
}
