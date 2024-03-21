import { Injectable } from '@nestjs/common';
import { CreateGroupPostDto, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({ data: createPostDto });
  }

  async createGroupPost(createGroupPostDto: CreateGroupPostDto) {
    const users = await this.prismaService.user.findMany({
      where: { id: { in: [...createGroupPostDto.userId] } },
    });
    const data: Prisma.GroupPostCreateInput = {
      title: createGroupPostDto.title,
      description: createGroupPostDto.description,
      users,
    };
    await this.prismaService.groupPost.create({ data });
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
