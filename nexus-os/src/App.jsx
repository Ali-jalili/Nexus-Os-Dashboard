/** @format */

import { Toaster } from "react-hot-toast";
import Router from "./app/routes/routes";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router />
    </>
  );
}

export default App;
