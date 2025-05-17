import database from './src/database';
import AppNavigation from './src/navigation';
import {DatabaseProvider} from '@nozbe/watermelondb/react';

const App = () => {
  return (
    <DatabaseProvider database={database}>
      <AppNavigation />
    </DatabaseProvider>
  );
};

export default App;
