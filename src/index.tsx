import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
