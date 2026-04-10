//@ts-ignore
import nightwind from "nightwind/helper";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import SomethingWentWrong, {
  PageLoading,
} from "./components/VisualFeedbacks.tsx";
import "./index.css";
import appStore from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    FallbackComponent={SomethingWentWrong}
    onReset={() => (location.href = "/")}
  >
    <Helmet>
      <script>{nightwind.init()}</script>
      <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
    </Helmet>
    <Provider store={appStore.store}>
      <PersistGate loading={<PageLoading />} persistor={appStore.persist}>
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
