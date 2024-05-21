import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { userDataSlicer, modalDataSlicer, signUpDataSlicer } from "./modules";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: userDataSlicer,
  signUp: signUpDataSlicer,
  modalDataSlicer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "signUp"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
