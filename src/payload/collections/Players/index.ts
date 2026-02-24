import type { CollectionAfterReadHook, CollectionConfig } from 'payload';

interface PlayerDoc {
  dateOfBirth?: string;
  age?: number;
  [key: string]: unknown;
}

const calculateAge: CollectionAfterReadHook = ({ doc }: { doc: PlayerDoc }) => {
  if (doc.dateOfBirth) {
    const birthDate = new Date(doc.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    doc.age = age;
  }

  return doc;
};

export const Players: CollectionConfig = {
  slug: 'players',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterRead: [calculateAge],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'profileImage',
      type: 'text',
    },
    {
      name: 'achievements',
      type: 'text',
    },
    {
      name: 'age',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Auto-calculated from date of birth',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Prevent age from being persisted to DB — computed at read time
            delete (siblingData as Record<string, unknown>)['age'];
          },
        ],
      },
    },
  ],
};
