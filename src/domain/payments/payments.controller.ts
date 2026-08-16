import { Controller, Param, Post } from '@nestjs/common';
import { IdDto } from 'common/dto/id.dto';
import { CurrentUser } from 'iam/authentication/decorators/current-user.decorator';
import type { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':id')
  payOrder(@Param() { id }: IdDto, @CurrentUser() currentUser: RequestUser) {
    return this.paymentsService.payOrder(id, currentUser);
  }
}
