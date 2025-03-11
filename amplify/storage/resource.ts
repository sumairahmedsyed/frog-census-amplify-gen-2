import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'frog-census-amplify-gen-2-storage',
  access: allow => ({
    'image-submissions/*': [
      allow.guest.to(['read', 'write'])
    ],
    'sound-submissions/*': [
      allow.guest.to(['read', 'write'])
    ]
  })
});
