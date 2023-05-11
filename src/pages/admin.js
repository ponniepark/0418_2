import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '@/firebase';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/TodoList.module.css';

const todoCollection = collection(db, 'todos');

const AdminPage = () => {
  const { data: session } = useSession();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        todoCollection,
        orderBy('date', 'desc')
      ),
      (snapshot) => {
        const newTodos = [];
        snapshot.forEach((doc) => {
          newTodos.push({ id: doc.id, ...doc.data() });
        });

        newTodos.sort((a, b) => a.date - b.date);
        setTodos(newTodos);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(todoCollection, id));
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo: ', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!session?.user?.id || !input.trim()) {
      return;
    }

    const now = new Date().toLocaleString();
    const userNickname = session.user.name;

    try {
      const docRef = await addDoc(todoCollection, {
        userId: session.user.id,
        userName: userNickname,
        text: input,
        completed: false,
        date: now
      });

      setTodos((prev) => [
        ...prev,
        {
          id: docRef.id,
          userName: userNickname,
          text: input,
          completed: false,
          date: now
        }
      ]);
      setInput('');
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  const [input, setInput] = useState('');

  const handleDeleteAllTodos = async () => {
    try {
      const todosToDelete = await query(
        todoCollection,
        session?.user?.id && where('userId', '==', session.user.id)
      ).get();

      const batch = db.batch();

      todosToDelete.forEach((doc) => {
        batch.delete(doc(todoCollection, doc.id));
      });

      await batch.commit();
      setTodos([]);
    } catch (error) {
      console.error('Error deleting all todos: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
      <button onClick={handleDeleteAllTodos}>Delete All Todos</button>
    </div>
  );
};

export default AdminPage;
