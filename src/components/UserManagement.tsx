
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const users = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    department: 'IT',
    position: 'Lập trình viên',
    phone: '0123456789',
    status: 'Hoạt động',
    lastUpdate: '2024-06-11',
    avatar: '/lovable-uploads/photo-1649972904349-6e44c42644a7'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    email: 'tranthibinh@email.com',
    department: 'Kế toán',
    position: 'Kế toán viên',
    phone: '0987654321',
    status: 'Hoạt động',
    lastUpdate: '2024-06-10',
    avatar: '/lovable-uploads/photo-1581091226825-a6a2a5aee158'
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    email: 'levancuong@email.com',
    department: 'Nhân sự',
    position: 'Trưởng phòng',
    phone: '0369852147',
    status: 'Nghỉ phép',
    lastUpdate: '2024-06-09',
    avatar: '/lovable-uploads/photo-1488590528505-98d2b5aba04b'
  },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin người dùng trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Tổng cộng {users.length} người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên nhân viên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Bộ phận</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Người cập nhật</TableHead>
                  <TableHead>Lần cập nhật cuối</TableHead>
                  <TableHead>Ảnh đại diện</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Hoạt động' ? 'default' : 'secondary'}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>Administrator</TableCell>
                    <TableCell>{user.lastUpdate}</TableCell>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
