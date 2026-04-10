import { Dispatch, Middleware, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const makeStore = () => {
  const middlewares: Middleware<Record<string, never>, any, Dispatch>[] = [];

  if (import.meta.env.DEV) middlewares.push(createLogger());

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: import.meta.env.DEV,
      }).concat(...middlewares),
  });

  const persist = persistStore(store);

  return { persist, store };
};

const appStore = makeStore();

export default appStore;
