/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as api from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoContext } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { filterType } = useContext(TodoContext);
  const [todos, setTodos] = useState<Todo[] | null>();

  const handleGetTodoList = () => {
    setIsLoading(true);
    api
      .getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  };

  const getFilteredTodos = () => {
    if (!todos) {
      return [];
    }

    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    handleGetTodoList();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && !!todos && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
