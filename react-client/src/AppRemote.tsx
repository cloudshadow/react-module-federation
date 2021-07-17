import * as React from 'react';
import { Provider } from 'react-redux';
import HomePage from './containers/HomePage';
import home from '@/reducers/homeReducer';

const AppRemote = (props: any) => {
  const { store } = props;
  React.useEffect(() => {
    store.injectReducer('home', home);
  }, []);
  return (
    <Provider store={store}>
      <div className="index-container">
        <div className="switch-container">
          <HomePage />
        </div>
      </div>
    </Provider>
  );
};

export default AppRemote;
