
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CategoryFormDialog } from '@/components/CategoryFormDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
  status: string;
  lastUpdate: string;
}

const initialCategories: Category[] = [
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
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; category?: Category }>({ open: false });
  const { toast } = useToast();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleSaveCategory = (categoryData: Omit<Category, 'id' | 'itemCount' | 'lastUpdate'>) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (editingCategory) {
      setCategories(categories.map(category => 
        category.id === editingCategory.id 
          ? { ...category, ...categoryData, lastUpdate: currentDate }
          : category
      ));
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...categoryData,
        itemCount: 0,
        lastUpdate: currentDate,
      };
      setCategories([...categories, newCategory]);
    }
  };

  const handleDeleteCategory = (category: Category) => {
    setDeleteDialog({ open: true, category });
  };

  const confirmDelete = () => {
    if (deleteDialog.category) {
      setCategories(categories.filter(c => c.id !== deleteDialog.category!.id));
      toast({
        title: "Xóa thành công",
        description: `Nhóm danh mục ${deleteDialog.category.name} đã được xóa.`,
      });
    }
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nhóm danh mục</h1>
          <p className="text-muted-foreground">
            Quản lý các nhóm danh mục trong hệ thống
          </p>
        </div>
        <Button onClick={handleAddCategory}>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Sửa
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
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

      <CategoryFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Xác nhận xóa nhóm danh mục"
        description={`Bạn có chắc chắn muốn xóa nhóm danh mục "${deleteDialog.category?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
