// sanity/sanity.config.js
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Turuchi Law blogs',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5lgtr8bc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // SITE SETTINGS (Singleton)
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            S.divider(),

            // PAGES
            S.listItem()
              .title('📄 Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('🏠 Homepage')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                      ),
                    S.listItem()
                      .title('ℹ️ About Us')
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                      ),
                    S.listItem()
                      .title('👤 Attorney Profile')
                      .child(
                        S.document()
                          .schemaType('attorneyProfile')
                          .documentId('attorneyProfile')
                      ),
                    S.listItem()
                      .title('📞 Contact')
                      .child(
                        S.document()
                          .schemaType('contactPage')
                          .documentId('contactPage')
                      ),
                  ])
              ),

            S.divider(),

            // LEGAL PAGES
            S.listItem()
              .title('⚖️ Legal Pages')
              .child(
                S.documentTypeList('legalPage')
                  .title('Privacy Policy, Terms & Disclaimer')
              ),

            // LANDING PAGES
            S.listItem()
              .title('🎯 Landing Pages')
              .child(
                S.list()
                  .title('Campaign Landing Pages')
                  .items([
                    S.listItem()
                      .title('Live')
                      .child(
                        S.documentList()
                          .title('Live Landing Pages')
                          .filter('_type == "landingPage" && published == true'),
                      ),
                    S.listItem()
                      .title('Drafts')
                      .child(
                        S.documentList()
                          .title('Draft Landing Pages')
                          .filter('_type == "landingPage" && published != true'),
                      ),
                    S.divider(),
                    S.listItem()
                      .title('All Landing Pages')
                      .child(S.documentTypeList('landingPage').title('All Landing Pages')),
                  ]),
              ),

            S.divider(),
            // Blog Section
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog Management')
                  .items([
                    S.listItem()
                      .title('Published Posts')
                      .child(
                        S.documentList()
                          .title('Published Posts')
                          .filter('_type == "blog" && status == "published"'),
                      ),
                    S.listItem()
                      .title('Draft Posts')
                      .child(
                        S.documentList()
                          .title('Draft Posts')
                          .filter('_type == "blog" && status == "draft"'),
                      ),
                    S.listItem()
                      .title('All Posts')
                      .child(S.documentTypeList('blog').title('All Blog Posts')),
                    S.divider(),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                    S.listItem().title('Tags').child(S.documentTypeList('tag').title('Tags')),
                  ]),
              ),

            S.divider(),

            // Services Section
            S.listItem()
              .title('Services')
              .child(
                S.list()
                  .title('Service Management')
                  .items([
                    S.listItem()
                      .title('Practice Areas')
                      .child(S.documentTypeList('practiceArea').title('Practice Areas')),
                    S.listItem()
                      .title('Sub-Services')
                      .child(S.documentTypeList('subService').title('Sub-Services')),
                    S.divider(),
                    S.listItem()
                      .title('By Practice Area')
                      .child(
                        S.documentTypeList('practiceArea')
                          .title('Select Practice Area')
                          .child((practiceAreaId) =>
                            S.documentList()
                              .title('Sub-Services')
                              .filter(
                                '_type == "subService" && practiceArea._ref == $practiceAreaId',
                              )
                              .params({practiceAreaId}),
                          ),
                      ),
                  ]),
              ),

            S.divider(),

            // Testimonials
            S.listItem()
              .title('Testimonials')
              .child(
                S.list()
                  .title('Testimonial Management')
                  .items([
                    S.listItem()
                      .title('Featured Testimonials')
                      .child(
                        S.documentList()
                          .title('Featured')
                          .filter('_type == "testimonial" && featured == true'),
                      ),
                    S.listItem()
                      .title('All Testimonials')
                      .child(S.documentTypeList('testimonial').title('All Testimonials')),
                    S.divider(),
                    S.listItem()
                      .title('By Case Type')
                      .child(
                        S.list()
                          .title('Filter by Case Type')
                          .items([
                            S.listItem()
                              .title('Personal Injury')
                              .child(
                                S.documentList()
                                  .title('Personal Injury')
                                  .filter(
                                    '_type == "testimonial" && caseType == "personal-injury"',
                                  ),
                              ),
                            S.listItem()
                              .title("Workers' Compensation")
                              .child(
                                S.documentList()
                                  .title("Workers' Compensation")
                                  .filter('_type == "testimonial" && caseType == "workers-compensation"'),
                              ),
                          ]),
                      ),
                  ]),
              ),

            S.divider(),

            // Location Settings
            S.listItem().title('NJ Counties').child(S.documentTypeList('county').title('Counties')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
