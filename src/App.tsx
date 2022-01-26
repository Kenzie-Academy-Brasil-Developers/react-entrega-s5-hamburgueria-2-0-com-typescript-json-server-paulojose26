import { Toaster } from "react-hot-toast";

import { Routes } from "./routes"

const App = () => {
  return (
    <>
    <Routes />
    <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
        }}
      />
    </>
  );
};

export default App;
