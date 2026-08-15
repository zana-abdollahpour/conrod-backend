import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { User } from 'domain/users/entities/user.entity';
import { HashingService } from 'iam/hashing/hashing.abstract.service';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { entity: user } = event;

    user.password = await this.hashingService.hash(user.password);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    const { entity: user } = event;

    if (user.password) {
      user.password = await this.hashingService.hash(user.password);
    }
  }
}
