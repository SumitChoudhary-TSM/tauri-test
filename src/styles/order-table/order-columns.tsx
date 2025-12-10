import type { GridColDef } from '@mui/x-data-grid';
import { StatusChip } from './status-chip';
import ViewIcon from '@/styles/icons/ViewIcon';
import CustomIconButton from '@/styles/icon-button';

export const columns = (onView?: (row: unknown) => void): GridColDef[] => [
  {
    field: 'id',
    headerName: 'Order ID',
    flex: 1,
  },
  {
    field: 'from',
    headerName: 'From',
    flex: 1,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
  },
  {
    field: 'qty',
    headerName: 'Qty',
    flex: 0.6,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => <StatusChip status={params.value} />,
  },
  {
    field: 'actions',
    width: 60,
    headerName: 'Action',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <CustomIconButton sizeType="sm" onClick={() => onView?.(params.row)}>
        <ViewIcon />
      </CustomIconButton>
    ),
  },
];
