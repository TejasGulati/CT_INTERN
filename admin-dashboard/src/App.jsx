import React, { useState} from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  BarChart3,
  Settings,
  Moon,
  Sun,
  Plus,
  Search,
  Bell,
  User,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [
      { id: 1, title: 'Design Homepage', assignee: 'John Doe', priority: 'high' },
      { id: 2, title: 'Setup Database', assignee: 'Jane Smith', priority: 'medium' }
    ],
    inProgress: [
      { id: 3, title: 'API Development', assignee: 'Mike Johnson', priority: 'high' },
      { id: 4, title: 'User Authentication', assignee: 'Sarah Wilson', priority: 'low' }
    ],
    done: [
      { id: 5, title: 'Project Setup', assignee: 'Tom Brown', priority: 'medium' },
      { id: 6, title: 'Requirements Analysis', assignee: 'Lisa Davis', priority: 'low' }
    ]
  });
  const [draggedTask, setDraggedTask] = useState(null);

  // Sample data
  const chartData = [
    { name: 'Jan', revenue: 4000, users: 240 },
    { name: 'Feb', revenue: 3000, users: 139 },
    { name: 'Mar', revenue: 2000, users: 980 },
    { name: 'Apr', revenue: 2780, users: 390 },
    { name: 'May', revenue: 1890, users: 480 },
    { name: 'Jun', revenue: 2390, users: 380 }
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#3B82F6' },
    { name: 'Mobile', value: 300, color: '#10B981' },
    { name: 'Tablet', value: 200, color: '#F59E0B' },
    { name: 'Other', value: 100, color: '#EF4444' }
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Pending', joined: '2024-03-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Inactive', joined: '2024-01-05' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Active', joined: '2024-02-28' }
  ];

  const events = [
    { date: 15, title: 'Team Meeting', time: '10:00 AM' },
    { date: 22, title: 'Product Launch', time: '2:00 PM' },
    { date: 28, title: 'Quarterly Review', time: '9:00 AM' }
  ];

  const themeClass = isDarkMode ? 'dark' : '';

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDragStart = (e, task, column) => {
    setDraggedTask({ task, sourceColumn: column });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, sourceColumn } = draggedTask;
    
    if (sourceColumn === targetColumn) return;

    setKanbanTasks(prev => {
      const newTasks = { ...prev };
      
      // Remove from source column
      newTasks[sourceColumn] = newTasks[sourceColumn].filter(t => t.id !== task.id);
      
      // Add to target column
      newTasks[targetColumn] = [...newTasks[targetColumn], task];
      
      return newTasks;
    });
    
    setDraggedTask(null);
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>{title}</p>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold mt-1`}>{value}</p>
          <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const KanbanColumn = ({ title, tasks, columnKey, count }) => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg flex-1`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>{title}</h3>
        <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} px-2 py-1 rounded-full text-xs`}>
          {count}
        </span>
      </div>
      <div 
        className="space-y-3 min-h-96"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, columnKey)}
      >
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task, columnKey)}
            className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} p-3 rounded-lg shadow-sm cursor-move border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition-all`}
          >
            <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm mb-2`}>{task.title}</h4>
            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{task.assignee}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${themeClass} min-h-screen transition-all duration-300`}>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
        {/* Sidebar */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} fixed left-0 top-0 w-64 h-full border-r transition-colors`}>
          <div className="p-6">
            <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>Admin Dashboard</h1>
          </div>
          
          <nav className="mt-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'kanban', label: 'Kanban', icon: Settings }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'}`
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-semibold capitalize`}>
                  {activeTab}
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900'} pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <button
                  onClick={toggleTheme}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
                
                <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-2 rounded-lg hover:bg-gray-100 transition-colors`}>
                  <Bell className="w-5 h-5" />
                </button>
                
                <button className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Revenue"
                    value="$45,231"
                    change={12}
                    icon={DollarSign}
                    color="bg-green-500"
                  />
                  <StatCard
                    title="New Customers"
                    value="1,234"
                    change={8}
                    icon={Users}
                    color="bg-blue-500"
                  />
                  <StatCard
                    title="Orders"
                    value="567"
                    change={-3}
                    icon={ShoppingCart}
                    color="bg-purple-500"
                  />
                  <StatCard
                    title="Page Views"
                    value="12,345"
                    change={15}
                    icon={Eye}
                    color="bg-orange-500"
                  />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Revenue Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px'
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Traffic Sources</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                  <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { user: 'John Doe', action: 'created a new project', time: '2 hours ago' },
                      { user: 'Jane Smith', action: 'updated user profile', time: '4 hours ago' },
                      { user: 'Mike Johnson', action: 'completed task review', time: '6 hours ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{activity.user}</span>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`}>{activity.action}</span>
                          </div>
                        </div>
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Monthly Growth</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="users" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>User Trends</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Users Management</h3>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Add User</span>
                      </button>
                      <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors`}>
                        <Filter className="w-5 h-5" />
                      </button>
                      <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors`}>
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>User</th>
                        <th className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>Role</th>
                        <th className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>Status</th>
                        <th className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>Joined</th>
                        <th className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {tableData.map((user) => (
                        <tr key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div className="ml-4">
                                <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>{user.name}</div>
                                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                              user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' :
                              user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className={`${isDarkMode ? 'text-gray-300' : 'text-gray-900'} px-6 py-4 whitespace-nowrap text-sm`}>
                            {user.joined}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} p-3 text-center font-medium text-sm`}>
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    const hasEvent = day && events.some(event => event.date === day);
                    const isSelected = selectedDate === day;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => day && setSelectedDate(day)}
                        className={`
                          relative p-3 h-12 text-sm rounded-lg transition-colors
                          ${!day ? 'invisible' : ''}
                          ${isSelected 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }
                          ${hasEvent && !isSelected ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}
                        `}
                      >
                        {day}
                        {hasEvent && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} mt-6 p-4 rounded-lg border`}>
                    <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>
                      Events for {currentDate.toLocaleDateString('en-US', { month: 'long' })} {selectedDate}
                    </h4>
                    {events
                      .filter(event => event.date === selectedDate)
                      .map((event, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{event.title}</p>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{event.time}</p>
                          </div>
                        </div>
                      ))
                    }
                    {!events.some(event => event.date === selectedDate) && (
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>No events scheduled</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'kanban' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Project Board</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>

                <div className="flex space-x-6 overflow-x-auto pb-4">
                  <KanbanColumn
                    title="To Do"
                    tasks={kanbanTasks.todo}
                    columnKey="todo"
                    count={kanbanTasks.todo.length}
                  />
                  <KanbanColumn
                    title="In Progress"
                    tasks={kanbanTasks.inProgress}
                    columnKey="inProgress"
                    count={kanbanTasks.inProgress.length}
                  />
                  <KanbanColumn
                    title="Done"
                    tasks={kanbanTasks.done}
                    columnKey="done"
                    count={kanbanTasks.done.length}
                  />
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 border rounded-xl`}>
                  <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Project Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{kanbanTasks.todo.length}</div>
                      <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Pending Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{kanbanTasks.inProgress.length}</div>
                      <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{kanbanTasks.done.length}</div>
                      <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;