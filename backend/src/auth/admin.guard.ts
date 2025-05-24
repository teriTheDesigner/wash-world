import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../user.entity';
import { Role } from '../user/role';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userWithToken: User = request.user;
    const user = await this.userService.findByEmail(userWithToken.email);

    if (!user || user.role !== Role.Admin) {
      throw new ForbiddenException('Access denied. Admins only.');
    }

    return true;
  }
}
