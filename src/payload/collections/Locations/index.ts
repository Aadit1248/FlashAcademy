import type { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'clayCourts',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'miniCourts',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'openTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: HH:mm (e.g. 06:00)',
      },
    },
    {
      name: 'closedTime',
      type: 'text',
      required: true,
      admin: {
        description: 'Format: HH:mm (e.g. 21:00)',
      },
    },
  ],
};
