import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
/* import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/interfaces/roles.interface'; */

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  /* @Auth(Roles.admin) */
  excecuteSeed() {
    return this.seedService.runSeed();
  }
}
