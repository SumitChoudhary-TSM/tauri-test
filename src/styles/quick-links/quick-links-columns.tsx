import type { GridColDef } from '@mui/x-data-grid';
import CustomButton from '@/styles/button';

interface QuickLinksColumnsProps {
  onActionClick: (actionName: string) => void;
}

export const getQuickLinksColumns = ({ onActionClick }: QuickLinksColumnsProps): GridColDef[] => [
  {
    field: 'action',
    headerName: '',
    flex: 1,
    width: 150,
    minWidth: 200,
    renderCell: (params) => (
      <CustomButton variantType="outline" fullWidth onClick={() => onActionClick(params.row.action)}>
        {params.row.action}
      </CustomButton>
    ),
  },
];
