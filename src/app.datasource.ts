import { DataSource } from 'typeorm';
import { Task } from './task/task.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: 'postgres://lhdgviot:lSfTS3PhLIh967F0Iz9QJ9YGIpcqNYYg@tiny.db.elephantsql.com/lhdgviot',
    database: 'todo',
    synchronize: true,
    logging: true,
    entities: [Task],
    subscribers: [],
    migrations: [],
});
