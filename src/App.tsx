import { useSelector } from "react-redux";
import "./App.css";
import AppDrawer from "./Components/AppDrawer";
import Navbar from "./Components/Navbar";
import PageNavigator from "./Components/PageNavigator";
import { getToken } from "./Model/UserSlice";
import ChangePassword from "./Pages/ChangePassword";
import CreditAccount from "./Pages/CreditAccount";
import EditAccount from "./Pages/EditAccount";
import HistoryPanel from "./Pages/HistoryPanel";
import LoginPage from "./Pages/LoginPage";
import MainPanel from "./Pages/MainPanel";
import ProductSelector from "./Pages/ProductSelector";

// On crée plusieurs contexte afin de permettre de fournir ces informations à

function App() {
  const token = useSelector(getToken);

  return (
    <div className="App">
      {token && <Navbar />}
      <PageNavigator
        pages={{
          login: <LoginPage />,
          mainMenu: <MainPanel />,
          selectProduct: <ProductSelector />,
          creditAccount: <CreditAccount />,
          editAccount: <EditAccount />,
          historyPanel: <HistoryPanel />,
          changePassword: <ChangePassword />,
        }}
      >
        <AppDrawer />
      </PageNavigator>
    </div>
  );
}

export default App;
