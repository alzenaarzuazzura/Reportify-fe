# Filter System Documentation

Sistem filter, search, dan sort yang terintegrasi dengan backend untuk aplikasi Reportify.

## 🎯 Overview

Sistem ini menyediakan pattern yang konsisten dan reusable untuk implementasi halaman list dengan fitur:
- ✅ Search
- ✅ Filter (multiple filters)
- ✅ Sort (server-side)
- ✅ Pagination
- ✅ Reset

**Prinsip Utama:**
1. **Backend-First**: Semua filtering dilakukan di backend
2. **Single Source of Truth**: Menggunakan `usePageListFilter` hook
3. **Strict Typing**: No `any` types
4. **Reusable Pattern**: Sama untuk semua halaman list

## 🚀 Quick Start

### 1. Import Hook
```typescript
import { usePageListFilter } from '@reportify/hooks/ui'
```

### 2. Define Filter Type
```typescript
type TTeacherFilter = {
  role?: 'admin' | 'teacher'
}
```

### 3. Use in Custom Hook
```typescript
const useTeacherList = () => {
  const { filters, setSearch, updateFilter } = usePageListFilter<TTeacherFilter>()
  
  const queryParams = {
    search: filters.search,
    role: filters.filters?.role,
  }
  
  const { data } = useQuery({
    queryKey: ['teachers', queryParams],
    queryFn: () => getList(queryParams),
  })
  
  return { data, filters, handleSearch: setSearch }
}
```

### 4. Use in Component
```typescript
const TeacherList = () => {
  const { data, filters, handleSearch } = useTeacherList()
  
  return (
    <>
      <Input value={filters.search} onChange={(e) => handleSearch(e.target.value)} />
      <Table dataSource={data} />
    </>
  )
}
```

## 📚 Documentation

### Core Documentation
- **[Quick Start Guide](./docs/QUICK_START_FILTER.md)** - 5-step implementation guide
- **[Filter Pattern Best Practices](./docs/FILTER_PATTERN.md)** - Complete guide with examples
- **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - Migrate from old pattern

### Implementation Examples
- **[Teacher List Example](./src/pages/admin/teachers/README.md)** - Complete implementation
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Full deliverables

### Hook Documentation
- **[UI Hooks README](./src/hooks/ui/README.md)** - All available hooks

## 🏗️ Architecture

```
UI Component
    ↓
Custom Hook (useTeacherList)
    ↓
usePageListFilter + useTableState + React Query
    ↓
API Service
    ↓
Backend (Filter, Search, Sort)
```

## 📦 Available Hooks

### `usePageListFilter<TFilter>`
Generic hook untuk filter management.

```typescript
const { filters, setSearch, updateFilter, setSortBy, resetFilters } = 
  usePageListFilter<TYourFilter>()
```

### `useDebounce<T>`
Debounce utility untuk search input.

```typescript
const debouncedSearch = useDebounce(searchInput, 500)
```

### `useTableState`
Table state management (pagination, sorting).

```typescript
const { tableParams, handleTableChange, setTotal } = useTableState()
```

## 🎨 UI Examples

### Basic Implementation
- **File**: `src/pages/admin/teachers/List.tsx`
- **Features**: Search, filter, table

### Enhanced Implementation
- **File**: `src/pages/admin/teachers/ListEnhanced.tsx`
- **Features**: Debounced search, active filters display

### Advanced Implementation
- **File**: `src/pages/admin/teachers/ListAdvanced.example.tsx`
- **Features**: Multiple filters, date range, bulk actions

## ✅ Implementation Checklist

- [ ] Define filter types
- [ ] Update API service
- [ ] Create custom hook with `usePageListFilter`
- [ ] Update UI component
- [ ] Test all functionality
- [ ] Update documentation

## 🔧 Key Features

### 1. Type Safety
```typescript
type TFilter = {
  role?: 'admin' | 'teacher'
}
const { filters } = usePageListFilter<TFilter>()
// filters.filters?.role is typed as 'admin' | 'teacher' | undefined
```

### 2. Automatic Refetch
```typescript
const { data } = useQuery({
  queryKey: ['data', queryParams], // Changes trigger refetch
  queryFn: () => getList(queryParams),
})
```

### 3. Clean Handler Functions
```typescript
const handleSearch = (value: string) => setSearch(value)
const handleRoleFilter = (role: TFilter['role']) => updateFilter('role', role)
```

### 4. Easy Reset
```typescript
const { resetFilters } = usePageListFilter<TFilter>()
// Resets all filters with one call
```

## 🚫 Common Mistakes

### ❌ Don't: Client-Side Filtering
```typescript
const filteredData = data?.filter(item => item.role === selectedRole)
```

### ✅ Do: Backend Filtering
```typescript
const queryParams = { role: filters.filters?.role }
const { data } = useQuery({
  queryFn: () => getList(queryParams),
})
```

### ❌ Don't: Multiple States
```typescript
const [search, setSearch] = useState('')
const [role, setRole] = useState('')
```

### ✅ Do: Single Hook
```typescript
const { filters, setSearch, updateFilter } = usePageListFilter<TFilter>()
```

## 📊 Performance

- **Debounced Search**: Reduces API calls
- **React Query Caching**: Automatic caching based on query key
- **Backend Pagination**: Only fetch needed data
- **Optimized Re-renders**: Minimal state updates

## 🧪 Testing

Tests available in `src/hooks/ui/__tests__/`

Run tests:
```bash
npm test usePageListFilter
```

## 🤝 Contributing

When adding new list pages:
1. Follow the pattern in Teacher implementation
2. Use `usePageListFilter` for filter management
3. Define proper types
4. Update documentation

## 📞 Support

1. Check [Quick Start Guide](./docs/QUICK_START_FILTER.md)
2. Review [Teacher Example](./src/pages/admin/teachers/README.md)
3. Check [Common Mistakes](./docs/FILTER_PATTERN.md#common-mistakes)
4. Ask team for help

## 📈 Status

✅ **Production Ready**

- All hooks implemented
- Types defined
- Documentation complete
- Examples provided
- Tests available

## 🔗 Quick Links

- [Quick Start](./docs/QUICK_START_FILTER.md)
- [Best Practices](./docs/FILTER_PATTERN.md)
- [Migration Guide](./docs/MIGRATION_GUIDE.md)
- [Teacher Example](./src/pages/admin/teachers/README.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

---

**Version**: 1.0.0  
**Last Updated**: 2026-01-07  
**Maintainer**: Frontend Team
