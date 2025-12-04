import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyTasksPage } from './pages/MyTasksPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { CalendarPage } from './pages/CalendarPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [taskId, setTaskId] = useState<string>();

  useEffect(() => {
    const checkPasswordRecovery = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');

      if (accessToken && type === 'recovery') {
        setCurrentPage('resetPassword');
      }
    };

    checkPasswordRecovery();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setCurrentPage('resetPassword');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) {
      setTaskId(id);
    }
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'resetPassword' && <ResetPasswordPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
      {currentPage === 'myTasks' && <MyTasksPage onNavigate={handleNavigate} />}
      {currentPage === 'employees' && <EmployeesPage onNavigate={handleNavigate} />}
      {currentPage === 'calendar' && <CalendarPage onNavigate={handleNavigate} />}
      {currentPage === 'settings' && <SettingsPage onNavigate={handleNavigate} />}
      {currentPage === 'taskDetails' && <TaskDetailsPage taskId={taskId} onNavigate={handleNavigate} />}
    </>
  );
}

export default App;
