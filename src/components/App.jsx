import { StoreProvider } from "easy-peasy";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "../context/GlobalState.jsx";
import Home from "./Home";
import NotFound from "./NotFound";
import SelectedFolderGrid from "./SelectedFolderGrid.jsx";

export default function App() {
  return (
    <div className="mx-auto h-screen w-11/12">
      <StoreProvider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:folderName/:folder_id">
              <SelectedFolderGrid />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}
