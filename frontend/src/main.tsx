import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalStyle } from "./styles/globalStyles";
import { ContactProvider } from "./providers/Contacts";
import { UserListProvider } from "./providers/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResetGlobal } from "./styles/reset";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ResetGlobal />
    <GlobalStyle />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <BrowserRouter>
      <ContactProvider>
        <UserListProvider>
          <App />
        </UserListProvider>
      </ContactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
