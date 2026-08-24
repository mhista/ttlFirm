import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5lgtr8bc',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  },
   deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'ny0dpqxvilweu9npzdwjo988',
  }
})
