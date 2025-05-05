import { Header } from "../components/Header";
import { ListItem, Variant } from "../components/ListItem";
import { Wrapper } from "../components/Wrapper";

export function Saved() {
  return (
    <Wrapper>
      <Header />
      <h1 className="text-2xl font-bold text-gray-200 p-4">Saved Items</h1>
      <ul>
        <ListItem variant={Variant.saved} text="Olá Mundo" />
        <ListItem variant={Variant.saved} text="Olá Mundo" />
        <ListItem variant={Variant.saved} text="Olá Mundo" />
      </ul>
    </Wrapper>
  );
}
