import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ApiForbiddenResponse } from '@nestjs/swagger';

import { ROLES_KEY } from 'iam/authorization/decorators/roles.decorator';
import { Role } from 'iam/authorization/enum/roles.enum';

@Injectable()
export class DocsForbiddenMapper implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  onApplicationBootstrap() {
    const controllers = this.discoveryService.getControllers();

    controllers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);

      const isControllerProtected = !!this.reflector.get<Role[]>(
        ROLES_KEY,
        instance.constructor,
      );

      const routeNames = this.metadataScanner.getAllMethodNames(prototype);
      const routeHandlers = routeNames.map((name) => instance[name]);

      if (isControllerProtected) {
        routeHandlers.forEach((route) => {
          ApiForbiddenResponse({ description: 'Forbidden' })(route);
        });

        return;
      }

      routeHandlers.forEach((route) => {
        const isProtected = this.reflector.get<boolean>(ROLES_KEY, route);
        if (!isProtected) {
          return;
        }

        ApiForbiddenResponse({ description: 'Unauthorized' })(route);
      });
    });
  }
}
