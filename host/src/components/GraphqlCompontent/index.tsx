import * as React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const RemoteUsersList = React.lazy(() => import('graphql_client/UsersList'));
const GraphqlComponent: React.FC = () => {
  // localStorage.setItem('@cloudTest', 'cloud test');
  // localStorage.removeItem('@cloudTest');
  return (
    <div className="container-fluid">
      <div className="row">
      <ErrorBoundary componentName="RemoteGraphQL">
        <React.Suspense fallback="Remote UsersList">
          <RemoteUsersList />
        </React.Suspense>
      </ErrorBoundary>
      </div>
    </div>
  );
};

export default GraphqlComponent;
