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
    {
      type: 'group',
      name: 'socialLinks',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://www.instagram.com/flash_sports10/',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://www.facebook.com/flashsportsnepal/',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      type: 'group',
      name: 'contactInfo',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+977 9801234567',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'info@flashsports.com.np',
        },
      ],
    },
    {
      type: 'group',
      name: 'operatingHours',
      label: 'Operating Hours',
      fields: [
        {
          name: 'morningHours',
          type: 'text',
          defaultValue: '6:00 AM - 10:00 AM',
        },
        {
          name: 'eveningHours',
          type: 'text',
          defaultValue: '4:00 PM - 8:00 PM',
        },
        {
          name: 'weekendHours',
          type: 'text',
          defaultValue: '6:00 AM - 6:00 PM',
        },
      ],
    },
  ],
};
