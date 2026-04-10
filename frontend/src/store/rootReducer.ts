import { combineReducers } from "@reduxjs/toolkit";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer } from "redux-persist";
import appReducer from "./slice";
import authReducer from "./authState";
import storage from "./storage";

const storageKeys = {
  root: "U82b5$3r",
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const config = getPersistConfig({
  storage: storage,
  key: storageKeys.root,
  rootReducer,
});

export default persistReducer(config, rootReducer);
