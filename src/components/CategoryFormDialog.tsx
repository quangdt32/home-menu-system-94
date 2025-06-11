
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id?: number;
  name: string;
  description: string;
  status: string;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  onSave: (category: Category) => void;
}

export function CategoryFormDialog({ open, onOpenChange, category, onSave }: CategoryFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<Category>({
    defaultValues: category || {
      name: '',
      description: '',
      status: 'Hoạt động',
    },
  });

  React.useEffect(() => {
    if (category) {
      form.reset(category);
    } else {
      form.reset({
        name: '',
        description: '',
        status: 'Hoạt động',
      });
    }
  }, [category, form]);

  const onSubmit = (data: Category) => {
    onSave(data);
    toast({
      title: category ? "Cập nhật thành công" : "Thêm mới thành công",
      description: `Nhóm danh mục ${data.name} đã được ${category ? 'cập nhật' : 'thêm mới'}.`,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Sửa nhóm danh mục' : 'Thêm nhóm danh mục mới'}</DialogTitle>
          <DialogDescription>
            {category ? 'Chỉnh sửa thông tin nhóm danh mục' : 'Nhập thông tin nhóm danh mục mới'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhóm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên nhóm danh mục" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Nhập mô tả nhóm danh mục" {...field} />
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
                {category ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
