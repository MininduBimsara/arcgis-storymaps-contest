// app/admin/categories/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { categoryApi, Category } from "@/lib/adminApi";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import { RefreshCw, Plus, AlertCircle } from "lucide-react";

const AdminCategoriesPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
        return;
      }
      if (user.role !== "admin") {
        router.push("/");
        return;
      }
      loadCategories();
    }
  }, [user, authLoading, router]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await categoryApi.getAllCategories();

      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData.sort((a, b) => a.order - b.order));
      } else {
        console.error("Categories data is not an array:", categoriesData);
        setCategories([]);
        setError("Invalid data format received from server.");
      }
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Failed to load categories. Please try again.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAction = async (categoryId: string, action: string) => {
    try {
      switch (action) {
        case "edit":
          const category = categories.find((c) => c._id === categoryId);
          setEditingCategory(category || null);
          setShowForm(true);
          break;
        case "toggle":
          await categoryApi.toggleCategoryStatus(categoryId);
          loadCategories();
          break;
        case "delete":
          const categoryToDelete = categories.find((c) => c._id === categoryId);
          if ((categoryToDelete?.submissionCount ?? 0) > 0) {
            alert(
              "Cannot delete category with submissions. Please move submissions to another category first."
            );
            return;
          }
          if (
            confirm(
              "Are you sure you want to delete this category? This action cannot be undone."
            )
          ) {
            await categoryApi.deleteCategory(categoryId);
            loadCategories();
          }
          break;
      }
    } catch (err) {
      console.error("Error performing category action:", err);
      setError("Failed to perform action. Please try again.");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleFormSave = async (categoryData: {
    name: string;
    description: string;
    slug: string;
    order: number;
  }) => {
    try {
      setFormLoading(true);
      if (editingCategory) {
        await categoryApi.updateCategory(editingCategory._id, categoryData);
      } else {
        await categoryApi.createCategory(categoryData);
      }
      setShowForm(false);
      setEditingCategory(null);
      loadCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      setError("Failed to save category. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        <div className="p-4 sm:p-6 lg:p-8 admin-layout-main">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Categories Management
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Organize submissions into categories ({categories.length}{" "}
                  total)
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={loadCategories}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Category
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-error-message">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories Table */}
          <CategoriesTable
            categories={categories}
            onCategoryAction={handleCategoryAction}
            loading={loading}
          />

          {/* Category Form Modal */}
          {showForm && (
            <CategoryForm
              category={editingCategory}
              onSave={handleFormSave}
              onCancel={handleFormCancel}
              loading={formLoading}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
