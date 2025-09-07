import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

/**
 * Sanity Studio Configuration
 * Defines the CMS interface and content models
 */

export default defineConfig({
  name: 'fareezart-cms',
  title: 'FareezArt CMS',
  
  projectId: 'd5yofoht',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .child(
                S.documentTypeList('project')
                  .title('Projects')
                  .filter('_type == "project"')
              ),
            S.divider(),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Project Settings')
                      .child(
                        S.document()
                          .schemaType('settings')
                          .documentId('settings')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Studio customization
  studio: {
    components: {
      // Customize the studio interface
    },
  },
  
  // API configuration
  api: {
    projectId: 'd5yofoht',
    dataset: 'production',
  },
});
