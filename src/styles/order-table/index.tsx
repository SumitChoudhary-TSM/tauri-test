import DataTable from '@/styles/data-table';
import { RoleType } from '@/styles/navbar/types';
import { columns } from './order-columns';
import { getOrdersByRole, getTableTitle } from './orders-data';

interface OrderTableProps {
  role: RoleType;
  onView?: (row: unknown) => void;
}

export function OrderTable({ role, onView }: OrderTableProps) {
  const orders = getOrdersByRole(role);
  const tableInfo = getTableTitle(role);

  return (
    <DataTable
      title={tableInfo.title}
      description={tableInfo.description}
      columns={columns(onView)}
      rows={orders}
      paginationModel={{ page: 0, pageSize: orders.length }}
      rowCount={orders.length}
      onPaginationModelChange={() => {}}
      hidePagination={true}
      height="auto"
      sx={{
        width: '100%',
      }}
    />
  );
}
