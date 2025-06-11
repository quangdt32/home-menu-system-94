
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

interface Item {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: string;
  status: string;
}

interface ItemFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: Item;
  onSave: (item: Item) => void;
}

export function ItemFormDialog({ open, onOpenChange, item, onSave }: ItemFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<Item>({
    defaultValues: item || {
      name: '',
      category: '',
      description: '',
      price: '',
      status: 'Hoạt động',
    },
  });

  React.useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        name: '',
        category: '',
        description: '',
        price: '',
        status: 'Hoạt động',
      });
    }
  }, [item, form]);

  const onSubmit = (data: Item) => {
    onSave(data);
    toast({
      title: item ? "Cập nhật thành công" : "Thêm mới thành công",
      description: `Mục ${data.name} đã được ${item ? 'cập nhật' : 'thêm mới'}.`,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Sửa mục danh mục' : 'Thêm mục danh mục mới'}</DialogTitle>
          <DialogDescription>
            {item ? 'Chỉnh sửa thông tin mục danh mục' : 'Nhập thông tin mục danh mục mới'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên mục</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên mục" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Phần mềm">Phần mềm</SelectItem>
                      <SelectItem value="Phần cứng">Phần cứng</SelectItem>
                      <SelectItem value="Dịch vụ">Dịch vụ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả mục" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập giá (VD: 1,000,000 VNĐ)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                      <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">
                {item ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
