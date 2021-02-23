import { Redirect, Route, Switch } from "react-router-dom";
import { AuthCheck } from "reactfire";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ChordForm } from "./pages/songs/ChordForm";
import { ChordView } from "./pages/songs/ChordView";
import { SongForm } from "./pages/songs/SongForm";

export function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      {/* <AuthCheck fallback={<Login />}></AuthCheck> */}
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/songs/create">
        <SongForm />
      </Route>
      <Route path="/songs/:songId/chords/create" children={<ChordForm />} />
      <Route path="/songs/:songId/chords" children={<ChordView />} />
    </Switch>
  );
}
