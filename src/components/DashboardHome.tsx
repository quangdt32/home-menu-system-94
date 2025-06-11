
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderTree, List, Activity } from 'lucide-react';

export function DashboardHome() {
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '1,234',
      description: '+20.1% so với tháng trước',
      icon: Users,
    },
    {
      title: 'Nhóm danh mục',
      value: '23',
      description: '+2 nhóm mới',
      icon: FolderTree,
    },
    {
      title: 'Danh mục',
      value: '156',
      description: '+12 danh mục mới',
      icon: List,
    },
    {
      title: 'Hoạt động',
      value: '89%',
      description: 'Tỷ lệ hoạt động hệ thống',
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trang chủ</h1>
        <p className="text-muted-foreground">
          Chào mừng bạn đến với hệ thống quản lý
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>
              Các hoạt động mới nhất trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Nguyễn Văn A</span> đã đăng nhập
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Trần Thị B</span> đã tạo danh mục mới
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  <span className="font-medium">Lê Văn C</span> đã cập nhật thông tin
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Thông báo hệ thống</CardTitle>
            <CardDescription>
              Các thông báo quan trọng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm">Bảo trì hệ thống</h4>
                <p className="text-xs text-muted-foreground">
                  Hệ thống sẽ bảo trì vào 2:00 AM ngày mai
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-sm">Cập nhật mới</h4>
                <p className="text-xs text-muted-foreground">
                  Phiên bản 2.1.0 đã được phát hành
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
