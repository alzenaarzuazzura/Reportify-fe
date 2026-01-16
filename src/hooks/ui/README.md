# UI Hooks

Kumpulan custom hooks untuk UI components yang reusable.

## useTableState

Hook untuk manage state table (pagination, sorting, filtering) secara otomatis.

### Features
- ✅ Auto pagination management
- ✅ Sorting state tracking
- ✅ Filter state tracking
- ✅ Reset table state
- ✅ Set total data dynamically

### Usage

```typescript
import useTableState from '@reportify/hooks/ui/useTableState'

const MyListComponent = () => {
  const { tableParams, handleTableChange, setTotal, resetTable } = useTableState({
    defaultPageSize: 10,
    defaultCurrent: 1,
  })

  // Gunakan di Table component
  return (
    <Table
      pagination={tableParams.pagination}
      onChange={handleTableChange}
      // ... props lainnya
    />
  )
}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| defaultPageSize | number | 10 | Jumlah data per halaman |
| defaultCurrent | number | 1 | Halaman awal |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| tableParams | TTableParams | State table (pagination, sort, filter) |
| handleTableChange | function | Handler untuk onChange table |
| setTotal | function | Set total data untuk pagination |
| resetTable | function | Reset table ke state awal |

### Example dengan React Query

```typescript
const useMyList = () => {
  const { tableParams, handleTableChange, setTotal } = useTableState()

  const { data } = useQuery({
    queryKey: ['myData', tableParams],
    queryFn: () => fetchData(),
  })

  // Set total otomatis
  if (data) {
    setTotal(data.length)
  }

  return {
    data,
    tableParams,
    handleTableChange,
  }
}
```

## useDialogDelete

Hook untuk menampilkan dialog konfirmasi delete via Redux.

### Usage

```typescript
import useDialogDelete from '@reportify/hooks/ui/useDialogDelete'

const MyComponent = () => {
  const { showDialogDelete } = useDialogDelete()

  const handleDelete = (id: number) => {
    showDialogDelete({
      onDelete: () => deleteData(id),
      localId: 'NamaData',
    })
  }

  return <button onClick={() => handleDelete(1)}>Delete</button>
}
```

## useVisibilityHandler

Hook untuk manage visibility state (modal, drawer, dll).

### Usage

```typescript
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const MyComponent = () => {
  const visibility = useVisibilityHandler()

  return (
    <>
      <button onClick={() => visibility.show('myModal')}>Open</button>
      <Modal 
        open={visibility.isVisible('myModal')}
        onClose={() => visibility.hide('myModal')}
      />
    </>
  )
}
```


## usePageListFilter

Hook generic untuk mengelola state filter, search, dan sort di halaman list.

### Features
- ✅ Search management
- ✅ Filter management (generic type)
- ✅ Sort management (sortBy + order)
- ✅ Reset functionality
- ✅ Update individual filters
- ✅ Fully typed with TypeScript generics

### Usage

```typescript
import usePageListFilter from '@reportify/hooks/ui/usePageListFilter'

type TMyFilter = {
  role?: string
  status?: string
}

const useMyList = () => {
  const { filters, setSearch, updateFilter, setSortBy, resetFilters } = 
    usePageListFilter<TMyFilter>()

  // Build query params untuk backend
  const queryParams = {
    search: filters.search,
    sortBy: filters.sortBy,
    order: filters.order,
    ...filters.filters,
  }

  const { data } = useQuery({
    queryKey: ['data', queryParams],
    queryFn: () => getList(queryParams),
  })

  return {
    data,
    filters,
    handleSearch: setSearch,
    handleRoleFilter: (role: string) => updateFilter('role', role),
    handleReset: resetFilters,
  }
}
```

### Parameters

Generic type `TFilter` - Type untuk filter fields

### Returns

| Property | Type | Description |
|----------|------|-------------|
| filters | TPageListFilter<TFilter> | Current filter state |
| setSearch | (search: string) => void | Update search value |
| setFilters | (filters: TFilter) => void | Update entire filter object |
| updateFilter | (key, value) => void | Update individual filter field |
| setSortBy | (sortBy: string, order: TSortOrder) => void | Update sort field and order |
| resetFilters | () => void | Reset all filters to initial state |

### Example dengan UI Components

```typescript
const MyListPage = () => {
  const {
    data,
    filters,
    handleSearch,
    handleRoleFilter,
    handleReset,
  } = useMyList()

  return (
    <>
      <Input
        value={filters.search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      <Select
        value={filters.filters?.role}
        onChange={handleRoleFilter}
      >
        <Option value="admin">Admin</Option>
        <Option value="user">User</Option>
      </Select>
      
      <Button onClick={handleReset}>Reset</Button>
      
      <Table dataSource={data} />
    </>
  )
}
```

### Documentation

Lihat dokumentasi lengkap di:
- [Filter Pattern Guide](../../docs/FILTER_PATTERN.md)
- [Quick Start Guide](../../docs/QUICK_START_FILTER.md)
- [Teacher Implementation Example](../../pages/admin/teachers/README.md)

## useDebounce

Hook untuk debounce value, berguna untuk mengurangi jumlah API calls saat user mengetik.

### Usage

```typescript
import useDebounce from '@reportify/hooks/ui/useDebounce'

const MyComponent = () => {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 500)

  // debouncedSearch akan update 500ms setelah user berhenti mengetik
  useEffect(() => {
    if (debouncedSearch) {
      fetchData(debouncedSearch)
    }
  }, [debouncedSearch])

  return (
    <Input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  )
}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| value | T | - | Value yang akan di-debounce |
| delay | number | 500 | Delay dalam milliseconds |

### Returns

Debounced value dengan type yang sama dengan input

## Testing

Tests tersedia di `__tests__/` directory.

Run tests:
```bash
npm test usePageListFilter
npm test useDebounce
npm test useTableState
```

## Best Practices

### 1. Gunakan usePageListFilter untuk semua list pages
```typescript
// ✅ BENAR
const { filters, setSearch } = usePageListFilter<TFilter>()

// ❌ SALAH - jangan buat state sendiri
const [search, setSearch] = useState('')
```

### 2. Combine dengan useTableState
```typescript
const { filters, setSearch } = usePageListFilter<TFilter>()
const { tableParams, handleTableChange } = useTableState()
```

### 3. Include filters di query key
```typescript
// ✅ BENAR - akan refetch saat filter berubah
queryKey: ['data', queryParams]

// ❌ SALAH - tidak akan refetch
queryKey: ['data']
```

### 4. Debounce search input
```typescript
const [searchInput, setSearchInput] = useState('')
const debouncedSearch = useDebounce(searchInput, 500)

if (debouncedSearch !== filters.search) {
  setSearch(debouncedSearch)
}
```

## Related Documentation

- [Filter Pattern Best Practices](../../docs/FILTER_PATTERN.md)
- [Quick Start Guide](../../docs/QUICK_START_FILTER.md)
- [Implementation Summary](../../../IMPLEMENTATION_SUMMARY.md)
