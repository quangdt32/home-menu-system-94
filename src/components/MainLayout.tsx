
import React from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Users, Settings, FolderTree, List, LogOut, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserManagement } from '@/components/UserManagement';
import { CategoryManagement } from '@/components/CategoryManagement';
import { ItemManagement } from '@/components/ItemManagement';
import { DashboardHome } from '@/components/DashboardHome';

const menuItems = [
  {
    title: 'Hệ thống',
    items: [
      {
        title: 'Người dùng',
        url: '/dashboard/users',
        icon: Users,
      },
      {
        title: 'Nhóm danh mục',
        url: '/dashboard/categories',
        icon: FolderTree,
      },
      {
        title: 'Danh mục',
        url: '/dashboard/items',
        icon: List,
      },
    ],
  },
];

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <nav className="container-fluid px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-primary" />
                <span className="font-semibold text-xl">Hệ thống quản lý</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Xin chào, {localStorage.getItem('userEmail') || 'Admin'}
              </span>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r shadow-sm min-h-[calc(100vh-73px)]">
            <div className="p-4">
              <nav className="space-y-2">
                {menuItems.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
                      {group.title}
                    </h3>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <button
                            onClick={() => navigate(item.url)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              location.pathname === item.url
                                ? 'bg-primary text-primary-foreground'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/categories" element={<CategoryManagement />} />
              <Route path="/items" element={<ItemManagement />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container-fluid px-4 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>&copy; 2025 - Hệ thống quản lý</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
