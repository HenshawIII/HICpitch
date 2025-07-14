import type {StructureResolver,StructureBuilder} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure:StructureResolver = (S:StructureBuilder) =>
  S.list()
    .title('Content')
    .items([S.documentTypeListItem("author").title("Author"),S.documentTypeListItem("startup").title("Startup")])
