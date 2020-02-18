import { Module, HttpModule } from '@nestjs/common'
import { UserResolve } from './user.resolve';

@Module({
  imports: [HttpModule],
  providers: [UserResolve]
})
export class UserModule {}