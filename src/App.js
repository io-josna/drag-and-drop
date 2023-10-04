import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WrapperContainer from "./Container/WrapperContainer";
import DragDropwitGrid from "./Components/DragDropwithGrid";
import Container from "./DNDComponents/Container";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <WrapperContainer /> */}
      <Container />
    </DndProvider>
  );
}

export default App;
