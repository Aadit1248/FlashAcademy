import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'sessionType',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'targetAudience',
      type: 'select',
      required: true,
      options: [
        { label: 'Adults', value: 'adults' },
        { label: 'Kids', value: 'kids' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'billingUnit',
      type: 'select',
      required: true,
      options: [
        { label: 'Month', value: 'month' },
        { label: 'Hour', value: 'hour' },
      ],
    },
    {
      name: 'sessionType',
      type: 'text',
      required: true,
    },
  ],
};
