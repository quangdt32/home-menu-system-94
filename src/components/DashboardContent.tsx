
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserManagement } from '@/components/UserManagement';
import { CategoryManagement } from '@/components/CategoryManagement';
import { ItemManagement } from '@/components/ItemManagement';
import { DashboardHome } from '@/components/DashboardHome';

export function DashboardContent() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/items" element={<ItemManagement />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
