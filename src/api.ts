import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .catch(() => {
      throw Error('An error ocurred');
    })
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

export const getTodo = (id: number): Promise<Todo | null> => {
  return getTodos().then(todos => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return null;
    }

    return todo as Todo;
  });
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
