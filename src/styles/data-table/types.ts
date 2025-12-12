import { SxProps, Theme } from '@mui/material';
import { DataGridProps, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

export interface DataTableProps extends DataGridProps {
  title?: string;
  description?: string;
  columns: GridColDef[];
  rows: unknown[];
  paginationModel: GridPaginationModel;
  rowCount: number;
  loading?: boolean;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  height?: number | string;
  searchBox?: React.ReactNode;
  actions?: React.ReactNode;
  hidePagination?: boolean;
  hideColumnHeaders?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}
