import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { Backdrop, CircularProgress } from '@mui/material';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense
        // fallback={
        //   <Backdrop sx={{ color: '#fff', zIndex: () => 9999 }} open={true}>
        //     <CircularProgress color="inherit" />
        //   </Backdrop>
        // }
        fallback={null}
      >
        <App />
      </Suspense>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
