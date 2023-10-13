import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/Home";
import List from "../pages/Board/List/List";
import Detail from "../pages/Board/Detail/Detail";
import Post from "../pages/Board/Post/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/list", element: <List /> },
      { path: "/list/:id", element: <Detail /> },
      { path: "/post", element: <Post /> },
      { path: "/post/:id", element: <Post /> },
    ],
  },
]);

export default router;
