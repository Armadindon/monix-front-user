import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import PageNavigator from "./Components/PageNavigator";
import { getToken } from "./Model/UserSlice";
import LoginPage from "./Pages/LoginPage";
import MainPanel from "./Pages/MainPanel";

// On crée plusieurs contexte afin de permettre de fournir ces informations à

function App() {
  const token = useSelector(getToken);

  return (
    <div className="App">
      <PageNavigator
        pages={{
          login: <LoginPage />,
          mainMenu: <MainPanel />,
          selectProduct: <></>,
        }}
      />
    </div>
  );
}

export default App;
