import CharacterDataGrid from "./components/character-data-grid/character-data-grid";
import CharacterListProvider from "./providers/character-list-provider";

function CharacterListPageInternal() {
  return <CharacterDataGrid />;
}

export default function CharacterListPage() {
  return (
    <CharacterListProvider>
      <CharacterListPageInternal />
    </CharacterListProvider>
  );
}
