import type { CollectionConfig } from 'payload'

export const BookedSlots: CollectionConfig = {
  slug: 'booked-slots',
  admin: {
    useAsTitle: 'phoneNumber',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
    {
      name: 'courtType',
      type: 'select',
      required: true,
      options: [
        { label: 'Clay Courts', value: 'clay_courts' },
        { label: 'Mini Courts', value: 'mini_courts' },
      ],
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'audience',
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
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
  ],
}