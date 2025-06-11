
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
import { ItemFormDialog } from '@/components/ItemFormDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';

interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  status: string;
  lastUpdate: string;
}

const initialItems: Item[] = [
  {
    id: 1,
    name: 'Visual Studio Code',
    category: 'Phần mềm',
    description: 'Trình soạn thảo mã nguồn',
    price: 'Miễn phí',
    status: 'Hoạt động',
    lastUpdate: '2024-06-11',
  },
  {
    id: 2,
    name: 'Dell Laptop XPS 13',
    category: 'Phần cứng',
    description: 'Laptop cao cấp cho lập trình viên',
    price: '25,000,000 VNĐ',
    status: 'Hoạt động',
    lastUpdate: '2024-06-10',
  },
  {
    id: 3,
    name: 'Cloud Hosting',
    category: 'Dịch vụ',
    description: 'Dịch vụ lưu trữ đám mây',
    price: '500,000 VNĐ/tháng',
    status: 'Hoạt động',
    lastUpdate: '2024-06-09',
  },
];

export function ItemManagement() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item?: Item }>({ open: false });
  const { toast } = useToast();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSaveItem = (itemData: Omit<Item, 'id' | 'lastUpdate'>) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData, lastUpdate: currentDate }
          : item
      ));
    } else {
      const newItem: Item = {
        id: Math.max(...items.map(i => i.id)) + 1,
        ...itemData,
        lastUpdate: currentDate,
      };
      setItems([...items, newItem]);
    }
  };

  const handleDeleteItem = (item: Item) => {
    setDeleteDialog({ open: true, item });
  };

  const confirmDelete = () => {
    if (deleteDialog.item) {
      setItems(items.filter(i => i.id !== deleteDialog.item!.id));
      toast({
        title: "Xóa thành công",
        description: `Mục ${deleteDialog.item.name} đã được xóa.`,
      });
    }
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
          <p className="text-muted-foreground">
            Quản lý các mục danh mục trong hệ thống
          </p>
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách mục</CardTitle>
          <CardDescription>
            Tổng cộng {items.length} mục danh mục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm mục danh mục..."
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
                  <TableHead>Tên mục</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Lần cập nhật cuối</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === 'Hoạt động' ? 'default' : 'secondary'}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Sửa
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteItem(item)}
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

      <ItemFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        item={editingItem}
        onSave={handleSaveItem}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Xác nhận xóa mục danh mục"
        description={`Bạn có chắc chắn muốn xóa mục "${deleteDialog.item?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
