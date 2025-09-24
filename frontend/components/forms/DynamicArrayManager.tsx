// components/forms/DynamicArrayManager.tsx
import React from 'react';
import { Plus, X } from 'lucide-react';
import DynamicFormField from './DynamicFormField';
import { FormField, FormErrors } from '@/types/submission';

interface DynamicArrayManagerProps<T> {
  title: string;
  items: T[];
  fields: FormField[];
  maxItems: number;
  emptyItem: T;
  errors: FormErrors;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
  getItemTitle: (index: number) => string;
  icon: React.ReactNode;
  iconColor: string;
}

function DynamicArrayManager<T>({
  title,
  items,
  fields,
  maxItems,
  emptyItem,
  errors,
  onAdd,
  onRemove,
  onChange,
  getItemTitle,
  icon,
  iconColor
}: DynamicArrayManagerProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center mb-6">
        <div className={iconColor}>
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                {getItemTitle(index)}
              </h3>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className={`grid gap-4 ${fields.length === 2 ? 'md:grid-cols-2' : fields.length === 3 ? 'md:grid-cols-3' : 'grid-cols-1'}`}>
              {fields.map((field) => (
                <DynamicFormField
                  key={field.name}
                  field={field}
                  value={(item as any)[field.name] || ''}
                  onChange={(fieldName, value) => onChange(index, fieldName, value)}
                  error={errors[`${field.name}_${index}_${field.name}`]}
                />
              ))}
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={onAdd}
          disabled={items.length >= maxItems}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {title.slice(0, -1)}
        </button>
      </div>
    </div>
  );
}

export default DynamicArrayManager;
