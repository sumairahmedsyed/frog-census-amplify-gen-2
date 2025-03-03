import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run frog-census-amplify-gen-2:serve',
        production: 'npx nx run frog-census-amplify-gen-2:serve-static',
      },
      ciWebServerCommand: 'npx nx run frog-census-amplify-gen-2:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
