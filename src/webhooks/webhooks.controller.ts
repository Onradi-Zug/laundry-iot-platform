import { Controller, Post, Body, Headers } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooks: WebhooksService) {}

  @Post('payrexx')
  payrexx(@Body() body: any) {
    return this.webhooks.handlePayrexx(body);
  }

  @Post('stripe')
  stripe(@Body() body: any, @Headers('stripe-signature') signature: string) {
    // TODO: додати перевірку підпису
    return this.webhooks.handleStripe(body);
  }

  @Post('generic')
  generic(@Body() body: any) {
    return this.webhooks.handleGeneric(body);
  }
}
