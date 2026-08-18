import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DocsUnauthorizedMapper } from 'docs/docs-unauthorized-mapper.mapper';

@Module({
  imports: [DiscoveryModule],
  providers: [DocsUnauthorizedMapper],
})
export class DocsModule {}
