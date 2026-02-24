import { Users, Locations, Services, Players, Events, BookedSlots } from '@/payload/collections';
import { SystemConfig } from '@/payload/globals';
import { defaultLexical } from '@/payload/fields/defaultLexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Locations, Services, Players, Events, BookedSlots],
  globals: [SystemConfig],
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
});
