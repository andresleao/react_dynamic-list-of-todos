import { createRoot } from 'react-dom/client';

import { App } from './App';
import { TodoProvider } from './components/TodoContext/TodoContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
