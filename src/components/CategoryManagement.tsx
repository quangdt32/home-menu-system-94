
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const categories = [
  {
    id: 1,
    name: 'Phần mềm',
    description: 'Các danh mục liên quan đến phần mềm',
    itemCount: 15,
    status: 'Hoạt động',
    lastUpdate: '2024-06-11',
  },
  {
    id: 2,
    name: 'Phần cứng',
    description: 'Các danh mục liên quan đến phần cứng',
    itemCount: 8,
    status: 'Hoạt động',
    lastUpdate: '2024-06-10',
  },
  {
    id: 3,
    name: 'Dịch vụ',
    description: 'Các danh mục dịch vụ',
    itemCount: 12,
    status: 'Tạm dừng',
    lastUpdate: '2024-06-09',
  },
];

export function CategoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nhóm danh mục</h1>
          <p className="text-muted-foreground">
            Quản lý các nhóm danh mục trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhóm danh mục</CardTitle>
          <CardDescription>
            Tổng cộng {categories.length} nhóm danh mục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nhóm danh mục..."
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
                  <TableHead>Tên nhóm</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số lượng mục</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Lần cập nhật cuối</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.itemCount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={category.status === 'Hoạt động' ? 'default' : 'secondary'}
                      >
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{category.lastUpdate}</TableCell>
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
