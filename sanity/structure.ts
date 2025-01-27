import {StructureBuilder} from 'sanity/desk'

export const defaultStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'), // Customize with your schema types
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
    ])
