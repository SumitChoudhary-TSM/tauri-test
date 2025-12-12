import { GridColDef } from '@mui/x-data-grid';
import UserDialog from './index';
import CustomIconButton from '@/styles/icon-button';
import EditIcon from '@/styles/icons/EditIcon';
import DeleteIcon from '@/styles/icons/DeleteIcon';
import { FormData } from './types';

interface UserColumnsProps {
  selectedUser: FormData | undefined;
  handleEdit: (row: FormData) => void;
  handleDelete: (row: FormData) => void;
}

export const getUserColumns = ({ selectedUser, handleEdit, handleDelete }: UserColumnsProps): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email/Code',
    flex: 1,
    renderCell: (param) => (param?.row?.email ? param.row.email : param?.row?.code),
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
  },
  {
    field: 'brands',
    headerName: 'Brands',
    flex: 1,
    renderCell: () => '-',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div className="flex gap-1 items-center justify-center">
        <UserDialog
          initialData={selectedUser}
          triggerButton={
            <CustomIconButton size="small" onClick={() => handleEdit(params.row)}>
              <EditIcon width={20} height={20} />
            </CustomIconButton>
          }
        />

        <CustomIconButton size="small" onClick={() => handleDelete(params.row)} className="h-fit">
          <DeleteIcon width={20} height={20} />
        </CustomIconButton>
      </div>
    ),
  },
];
