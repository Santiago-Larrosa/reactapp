import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./SRC/index.css";
import Root from "./SRC/root/root";
import App from "./SRC/root/App";
import Comentarios from "./SRC/root/comentarios";
import Coment from "./SRC/root/coment";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/comentarios",
    element: <Comentarios />,
  },
  {
    path: "/coment/:id", // Define un parámetro en la ruta
    element: <Coment />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
