import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Filter, SortAsc, SortDesc } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [error, setError] = useState('');

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks = [
      { id: 1, text: 'Complete React project', completed: false, createdAt: new Date('2024-01-15') },
      { id: 2, text: 'Review code documentation', completed: true, createdAt: new Date('2024-01-14') },
      { id: 3, text: 'Set up testing environment', completed: false, createdAt: new Date('2024-01-16') }
    ];
    setTasks(sampleTasks);
  }, []);

  // Validate task input
  const validateInput = (input) => {
    if (!input.trim()) {
      return 'Task cannot be empty';
    }
    if (input.trim().length < 3) {
      return 'Task must be at least 3 characters long';
    }
    if (input.trim().length > 100) {
      return 'Task must be less than 100 characters';
    }
    if (tasks.some(task => task.text.toLowerCase() === input.trim().toLowerCase())) {
      return 'Task already exists';
    }
    return '';
  };

  // Add new task
  const addTask = () => {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
    setError('');
  };

  // Remove task
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  // Sort tasks
  const getSortedTasks = (filteredTasks) => {
    switch (sortOrder) {
      case 'oldest':
        return [...filteredTasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'alphabetical':
        return [...filteredTasks].sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
      case 'newest':
      default:
        return [...filteredTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📝 To-Do List
            </h1>
            <p className="text-gray-600">
              Stay organized and productive
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {completedCount} of {totalCount} tasks completed
            </div>
          </div>

          {/* Add Task Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter a new task..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 font-medium"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 px-1">
                {error}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {sortOrder === 'newest' ? <SortDesc size={18} className="text-gray-500" /> : <SortAsc size={18} className="text-gray-500" />}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {sortedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <p className="text-gray-500 text-lg">
                  {filter === 'all' ? 'No tasks yet!' : `No ${filter} tasks found`}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {filter === 'all' ? 'Add your first task above' : 'Try changing the filter'}
                </p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-50 border-green-200 opacity-75'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>

                  <span
                    className={`flex-1 text-left ${
                      task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.text}
                  </span>

                  <span className="text-xs text-gray-400 hidden sm:block">
                    {task.createdAt.toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;