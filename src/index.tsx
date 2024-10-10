import "./index.scss";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Onboard } from "./features/Onboard/Onboard";
import { useAppDispatch } from "./hooks/hooks";
import { setDisableMock } from "./store/developmentTypeSlice";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

const RootWrapper = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();

  if (process.env.REACT_APP_MOCK_MODE === "false") {
    dispatch(setDisableMock());
  }
  useEffect(() => {
    document.title = "CruitWise";
  }, []);

  return children;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootWrapper>
        <RouterProvider router={router} />
      </RootWrapper>
    </Provider>
  </React.StrictMode>,
);
