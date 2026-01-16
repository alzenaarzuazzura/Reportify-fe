# Backend Integration Guide

Panduan integrasi frontend dengan backend untuk filter, search, dan sort system.

## 🔌 Backend API Requirements

### Endpoint: GET /users

Backend harus mendukung query parameters berikut:

```
GET /users?search=john&role=teacher&sortBy=name&order=asc&page=1&limit=10
```

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search term untuk name atau email | `john` |
| `role` | string | Filter by role (admin/teacher) | `teacher` |
| `sortBy` | string | Field untuk sorting | `name`, `email`, `id` |
| `order` | string | Sort order (asc/desc) | `asc`, `desc` |
| `page` | number | Page number (1-based) | `1`, `2`, `3` |
| `limit` | number | Items per page | `10`, `20`, `50` |

### Response Format

Backend harus mengembalikan response dengan format:

```json
{
  "success": true,
  "message": "Berhasil mengambil data users",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "teacher"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## 🔧 Backend Implementation

### Controller (userController.js)

```javascript
const getAllUsers = async (req, res) => {
  try {
    const { search, role, sortBy, order, page, limit } = req.query;

    // Build where clause
    const where = {};

    // Search by name or email
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filter by role
    if (role) {
      where.role = role;
    }

    // Build orderBy clause
    const validSortFields = ['id', 'name', 'email', 'role', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
    const sortOrder = order === 'desc' ? 'desc' : 'asc';

    const orderBy = { [sortField]: sortOrder };

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const total = await prisma.users.count({ where });

    // Get users with filters, sort, and pagination
    const users = await prisma.users.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true
      }
    });

    // Return with pagination metadata
    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data users',
      data: users,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error getAllUsers:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data users'
    });
  }
};
```

## 🎨 Frontend Implementation

### 1. API Service (teacher.ts)

```typescript
type TTeacherListResponse = {
  success: boolean
  message: string
  data: TTeacherListData[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const getList = async (params?: TTeacherListParams): Promise<TTeacherListResponse> => {
  const res = await api.get<TTeacherListResponse>('/users', { params })
  return res.data
}
```

### 2. Custom Hook (useTeacherList.ts)

```typescript
const useTeacherList = () => {
  const { filters, setSearch, updateFilter, setSortBy } = usePageListFilter<TTeacherFilter>()
  const { tableParams, handleTableChange: originalHandleTableChange, setTotal } = useTableState()

  // Build query params
  const queryParams: TTeacherListParams = {
    search: filters.search,
    sortBy: filters.sortBy,
    order: filters.order,
    role: filters.filters?.role,
    page: tableParams.pagination.current,
    limit: tableParams.pagination.pageSize,
  }

  // Fetch data
  const { data: response } = useQuery({
    queryKey: ['teachers', queryParams],
    queryFn: () => getList(queryParams),
  })

  // Update total dari backend
  if (response?.pagination) {
    setTotal(response.pagination.total)
  }

  // Handle table change dengan sorting
  const handleTableChange = (pagination, filters, sorter) => {
    if (!Array.isArray(sorter) && sorter.field && sorter.order) {
      const sortField = Array.isArray(sorter.field) ? sorter.field[0] : sorter.field
      const sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc'
      setSortBy(sortField as string, sortOrder)
    }
    originalHandleTableChange(pagination, filters, sorter)
  }

  return {
    data: response?.data || [],
    handleTableChange,
    // ... other returns
  }
}
```

### 3. Component (List.tsx)

```typescript
const columns: ColumnsType<TTeacherListData> = [
  {
    title: 'Nama',
    dataIndex: 'name',
    sorter: true, // Enable server-side sorting
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true, // Enable server-side sorting
  },
]

return (
  <Table
    columns={columns}
    dataSource={data}
    onChange={handleTableChange}
    pagination={tableParams.pagination}
  />
)
```

## 🔍 How It Works

### Search Flow

1. User types in search input
2. `handleSearch(value)` called
3. `setSearch(value)` updates filter state
4. Filter state change triggers React Query refetch
5. Query params sent to backend: `?search=value`
6. Backend searches in name and email fields
7. Filtered results returned
8. Table displays filtered data

### Filter Flow

1. User selects filter option (e.g., role)
2. `handleRoleFilter(role)` called
3. `updateFilter('role', role)` updates filter state
4. Filter state change triggers React Query refetch
5. Query params sent to backend: `?role=teacher`
6. Backend filters by role
7. Filtered results returned
8. Table displays filtered data

### Sort Flow

1. User clicks column header to sort
2. `handleTableChange` called with sorter info
3. `setSortBy(field, order)` updates filter state
4. Filter state change triggers React Query refetch
5. Query params sent to backend: `?sortBy=name&order=asc`
6. Backend sorts data
7. Sorted results returned
8. Table displays sorted data

### Pagination Flow

1. User clicks page number or changes page size
2. `handleTableChange` called with pagination info
3. Table state updated
4. State change triggers React Query refetch
5. Query params sent to backend: `?page=2&limit=10`
6. Backend returns page 2 with 10 items
7. Table displays page 2

## 🧪 Testing

### Manual Testing

1. **Search**
   - Type in search box
   - Check network tab: `?search=...` sent
   - Verify filtered results

2. **Filter**
   - Select filter option
   - Check network tab: `?role=...` sent
   - Verify filtered results

3. **Sort**
   - Click column header
   - Check network tab: `?sortBy=...&order=...` sent
   - Verify sorted results

4. **Pagination**
   - Click next page
   - Check network tab: `?page=2` sent
   - Verify correct page displayed

5. **Combined**
   - Apply search + filter + sort
   - Check all params sent together
   - Verify results match all criteria

### Backend Testing with cURL

```bash
# Search
curl "http://localhost:3000/api/users?search=john"

# Filter
curl "http://localhost:3000/api/users?role=teacher"

# Sort
curl "http://localhost:3000/api/users?sortBy=name&order=asc"

# Pagination
curl "http://localhost:3000/api/users?page=2&limit=10"

# Combined
curl "http://localhost:3000/api/users?search=john&role=teacher&sortBy=name&order=asc&page=1&limit=10"
```

## 🚨 Common Issues

### Issue 1: Filters not working

**Symptom**: Filters don't affect results

**Check**:
- Backend receives query params (check logs)
- Backend implements filter logic
- Frontend sends correct params (check network tab)

**Solution**: Verify backend controller implements filtering

### Issue 2: Pagination shows wrong total

**Symptom**: Pagination shows incorrect total count

**Check**:
- Backend returns correct `pagination.total`
- Frontend updates total: `setTotal(response.pagination.total)`

**Solution**: Ensure backend counts with same filters

### Issue 3: Sort not working

**Symptom**: Clicking column header doesn't sort

**Check**:
- Column has `sorter: true`
- `handleTableChange` handles sorter
- Backend receives `sortBy` and `order` params

**Solution**: Verify all three points above

### Issue 4: Search is case-sensitive

**Symptom**: Search only finds exact case matches

**Check**: Backend uses `mode: 'insensitive'` in Prisma query

**Solution**:
```javascript
where.OR = [
  { name: { contains: search, mode: 'insensitive' } }
]
```

## 📝 Checklist

### Backend
- [ ] Accepts query parameters (search, role, sortBy, order, page, limit)
- [ ] Implements search logic (case-insensitive)
- [ ] Implements filter logic
- [ ] Implements sort logic
- [ ] Implements pagination
- [ ] Returns pagination metadata
- [ ] Returns correct response format

### Frontend
- [ ] Sends query parameters to backend
- [ ] Handles pagination metadata
- [ ] Updates total count from backend
- [ ] Handles sorting in table
- [ ] Enables sorter on columns
- [ ] No client-side filtering
- [ ] No client-side sorting

## 🔗 Related Documentation

- [Quick Start Guide](./QUICK_START_FILTER.md)
- [Filter Pattern Guide](./FILTER_PATTERN.md)
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)

---

**Last Updated**: 2026-01-07
