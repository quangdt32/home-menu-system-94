
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Hệ thống quản lý</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Chào mừng bạn đến với hệ thống quản lý hiện đại
        </p>
        <Button 
          onClick={() => navigate('/login')}
          size="lg"
          className="px-8 py-3"
        >
          Đăng nhập vào hệ thống
        </Button>
      </div>
    </div>
  );
};

export default Index;
