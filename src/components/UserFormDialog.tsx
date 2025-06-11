
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

interface User {
  id?: number;
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  status: string;
}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSave: (user: User) => void;
}

export function UserFormDialog({ open, onOpenChange, user, onSave }: UserFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<User>({
    defaultValues: user || {
      name: '',
      email: '',
      department: '',
      position: '',
      phone: '',
      status: 'Hoạt động',
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset(user);
    } else {
      form.reset({
        name: '',
        email: '',
        department: '',
        position: '',
        phone: '',
        status: 'Hoạt động',
      });
    }
  }, [user, form]);

  const onSubmit = (data: User) => {
    onSave(data);
    toast({
      title: user ? "Cập nhật thành công" : "Thêm mới thành công",
      description: `Người dùng ${data.name} đã được ${user ? 'cập nhật' : 'thêm mới'}.`,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Sửa người dùng' : 'Thêm người dùng mới'}</DialogTitle>
          <DialogDescription>
            {user ? 'Chỉnh sửa thông tin người dùng' : 'Nhập thông tin người dùng mới'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhân viên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên nhân viên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Nhập email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bộ phận</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bộ phận" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Kế toán">Kế toán</SelectItem>
                      <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập vị trí" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
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
                      <SelectItem value="Nghỉ phép">Nghỉ phép</SelectItem>
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
                {user ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
