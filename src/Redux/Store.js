import { configureStore } from "@reduxjs/toolkit";
import AuthRedux from "./AuthRedux";

export const Store = configureStore({
    reducer:{

        auth:AuthRedux
    }
})

