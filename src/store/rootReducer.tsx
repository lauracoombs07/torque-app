import { combineReducers } from "redux"

import apiClient from "../services/training-application-api-slice"

const rootReducer = combineReducers({
  [apiClient.reducerPath]: apiClient.reducer
})

export default rootReducer
