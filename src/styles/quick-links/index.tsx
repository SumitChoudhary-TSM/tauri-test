import React from 'react';
import DataTable from '@/styles/data-table';
import { RoleType } from '@/styles/navbar/types';
import { getActionRows } from './quick-links-data';
import { getQuickLinksColumns } from './quick-links-columns';

interface QuickLinksProps {
  role: RoleType;
  onActionClick?: (actionName: string) => void;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ role, onActionClick }) => {
  const actionRows = getActionRows(role);

  const handleActionClick = (actionName: string) => {
    console.log(`Action clicked: ${actionName}`);
    onActionClick?.(actionName);
  };

  const columns = getQuickLinksColumns({ onActionClick: handleActionClick });

  if (actionRows.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <DataTable
        title="Quick Actions"
        columns={columns}
        rows={actionRows}
        paginationModel={{ page: 0, pageSize: actionRows.length }}
        rowCount={actionRows.length}
        onPaginationModelChange={() => {}}
        height="auto"
        hidePagination={true}
        hideColumnHeaders={true}
        sx={{
          border: 0,
          '& .MuiDataGrid-cell': {
            borderTop: 'none',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
    </div>
  );
};

export default QuickLinks;
