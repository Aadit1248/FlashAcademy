import { GlobalConfig } from 'payload';

export const SystemConfig: GlobalConfig = {
  slug: 'system-config',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bookFreeLession',
      type: 'text',
      required: true,
      dbName: 'book_free_lession',
    },
  ],
};
