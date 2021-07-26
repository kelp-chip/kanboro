import { useState } from "react";
import Header from "components/Header";
import Board from "./components/Board";
import { withRouter } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Header />
      <Board />
    </>
  );
}

export default withRouter(Dashboard);
