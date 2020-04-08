require('dotenv').config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL
let d = {
  'user': 1,
  'password': 2,
  'host': 3,
  'port': 4,
  'database': 5
}
let re = /postgres\:\/\/(\w+)\:([a-z0-9]+)@([^:]+)\:(\d+)\/(\w+)/g
let a = re.exec(DATABASE_URL)

module.exports = {
  client: 'pg',
  connection: {
    user: a[d.user],
    password: a[d.password],
    database: a[d.database],
    host: a[d.host],
    port: a[d.port],
    ssl: {
      rejectUnauthorized: true,
    },
  },
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
  migrations: {
    directory: 'migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
};
