import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        userSetting: {
          create: {
            smsEnabled: false,
            notificationsOn: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      include: { userSetting: true, posts: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            notificationsOn: true,
            smsEnabled: true,
          },
        },
        posts: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Invalid User Id');
    }
    return user;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    await this.findOne(id);

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateUserSetting(
    userId: number,
    userSettingDto: Prisma.UserSettingUpdateInput,
  ) {
    const user = await this.findOne(userId);

    const userSetting = await this.prismaService.userSetting.update({
      where: { userId },
      data: {
        ...userSettingDto,
      },
    });

    // OR

    // return await this.prismaService.user.update({
    //   where: { id: userId },
    //   data: {
    //     userSetting: {
    //       update: {
    //         ...userSettingDto
    //       }
    //     }
    //   },
    // });
    return userSetting;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.user.delete({ where: { id } });
  }
}
