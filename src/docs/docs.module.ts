import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DocsForbiddenMapper } from 'docs/docs-forbidden.mapper';

import { DocsUnauthorizedMapper } from 'docs/docs-unauthorized-mapper.mapper';

@Module({
  imports: [DiscoveryModule],
  providers: [DocsUnauthorizedMapper, DocsForbiddenMapper],
})
export class DocsModule {}
