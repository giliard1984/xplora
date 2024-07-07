import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
