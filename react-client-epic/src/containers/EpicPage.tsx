import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import rootAction from '@/actions';
import EpicComponent from '@/components/Epic/EpicComponent';
import { RootState } from '@/types/GlobalTypes';
import { IEpicState } from '@/types/EpicTypes';

const EpicPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const epicState = useSelector<RootState, IEpicState>(
    (state) => state.epic,
    shallowEqual
  );

  return (
    <EpicComponent
      fetchThunk={(args) => dispatch(rootAction.epicActions.fetchThunk(args))}
      fetchEpicRequest={() => dispatch(rootAction.epicActions.fetchEpicAsync.request())}
      epicState={epicState}
    />
  );
};

export default EpicPage;
