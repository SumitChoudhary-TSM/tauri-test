import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridSlotsComponentsProps } from '@mui/x-data-grid';
import { Box, Stack, type SxProps, type Theme } from '@mui/material';
import { Description, Subheading } from '../typography';
import { deepmerge } from '@mui/utils';
import { DataTableProps } from './types';

const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  columns,
  rows,
  paginationModel,
  rowCount,
  loading = false,
  onPaginationModelChange,
  height = '85vh',
  searchBox,
  actions,
  hidePagination = false,
  hideColumnHeaders = false,
  className,
  sx,
}) => {
  const hasTitleBlock = Boolean(title || description);
  const hasActions = Boolean(actions);
  const hasSearch = Boolean(searchBox);

  const defaultSx: SxProps<Theme> = {
    height: '100%',
    width: '100%',
    border: 'none',
    '& .MuiDataGrid-columnHeaders': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: 'background.paper',
      display: hideColumnHeaders ? 'none' : 'flex',
    },
    '& .MuiDataGrid-virtualScroller': {
      marginTop: '0!important',
    },
    '& .MuiDataGrid-footerContainer': {
      position: 'sticky',
      bottom: 0,
      zIndex: 1,
      backgroundColor: 'background.paper',
      display: hidePagination ? 'none' : 'flex',
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      className={className}
    >
      {hasTitleBlock ? (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Box>
            {title && <Subheading>{title}</Subheading>}
            {description && <Description>{description}</Description>}
          </Box>

          {hasActions && (
            <Stack direction="row" spacing={1}>
              {actions}
            </Stack>
          )}
        </Stack>
      ) : (
        (hasSearch || hasActions) && (
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>{searchBox}</Box>
            <Stack direction="row" spacing={1}>
              {actions}
            </Stack>
          </Stack>
        )
      )}

      {hasTitleBlock && !hasActions && hasSearch && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>{searchBox}</Box>
      )}

      {hasTitleBlock && hasActions && hasSearch && <Box sx={{ mb: 2 }}>{searchBox}</Box>}

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 60px)',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            overflow: 'auto',
          }}
        >
          <DataGrid
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            pageSizeOptions={[5, 10, 25, 50]}
            hideFooter={hidePagination}
            disableRowSelectionOnClick
            sx={deepmerge(defaultSx, sx)}
            slotProps={
              {
                columnHeaders: {
                  sx: {
                    display: hideColumnHeaders ? 'none' : 'flex',
                  },
                },
              } as GridSlotsComponentsProps
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
