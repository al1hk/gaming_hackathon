import type {StructureResolver} from 'sanity/structure'

const structure: StructureResolver = (S) =>
  S.list().title('Base').items(
    S.documentTypeListItems() // <= example code goes here
  )
export default structure;
