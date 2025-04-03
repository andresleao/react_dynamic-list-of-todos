import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoContextType = {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  isModalLoading: boolean;
  setIsModalLoading: (isLoading: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  filterType: string;
  setFilterType: (type: string) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  selectedTodo: null,
  setSelectedTodo: () => {},
  isModalLoading: false,
  setIsModalLoading: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  filterType: 'all',
  setFilterType: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterType, setFilterType] = useState('all');

  const value = useMemo(
    () => ({
      selectedTodo,
      setSelectedTodo,
      isModalLoading,
      setIsModalLoading,
      selectedUser,
      setSelectedUser,
      filterType,
      setFilterType,
    }),
    [selectedTodo, isModalLoading, selectedUser, filterType],
  );

  // prettier-ignore
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
