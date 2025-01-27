import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk' // Still needed for enabling the Desk interface
import {schema} from './sanity/schemaTypes'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {defaultStructure} from './sanity/structure' // Assuming you have a custom structure file

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    deskTool({
      structure: defaultStructure, // Use your custom structure
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
