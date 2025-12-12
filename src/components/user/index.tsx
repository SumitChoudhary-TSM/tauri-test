import { Card } from '@mui/material';
import DownloadIcon from '@/styles/icons/DownloadIcon';
import { Heading, Paragraph } from '@/styles/typography';
import SearchBar from '@/styles/search-bar';
import { useEffect, useState } from 'react';
import type { GridPaginationModel } from '@mui/x-data-grid';
import DataTable from '@/styles/data-table';
import CustomButton from '@/styles/button';
import UserDialog from '@/styles/user';
import { CustomDialog } from '@/styles/dialog';
import { FormData } from '@/styles/user/types';
import { DummyUserData } from '@/constants/mock-data';
import { getUserColumns } from '@/styles/user/UserColumns';
import MultiSelectPopover from '@/styles/multiselect-popover';
import { userTypeConfig } from '@/styles/user/user-type-config';

export default function UserPage() {
  const [rows, setRows] = useState<FormData[]>([]);
  const [search, setSearch] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FormData | undefined>(undefined);
  const [selectedRole, setSelectedRole] = useState<string[]>([]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setRows(DummyUserData);
      setRowCount(3);
      setLoading(false);
    };
    fetchUsers();
  }, [paginationModel]);

  const handleEdit = (row: FormData) => {
    setSelectedUser(row);
  };

  const handleDelete = (row: FormData) => {
    setSelectedUser(row);

    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    setOpenDelete(false);
    console.log(selectedUser);
  };

  const columns = getUserColumns({
    selectedUser,
    handleEdit,
    handleDelete,
  });

  return (
    <>
      {console.log(selectedRole)}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Heading>Users</Heading>
            <Paragraph>All users for your team</Paragraph>
          </div>
          <UserDialog />
        </div>

        <Card className="border-border/40 rounded-xl">
          <div className="overflow-x-auto">
            <DataTable
              searchBox={
                <SearchBar
                  value={search}
                  onSearch={() => {}}
                  onChange={(val) => setSearch(val)}
                  loading={loading}
                  placeholder="Search users..."
                  minWidth="300px"
                  className="rounded-xl"
                />
              }
              actions={
                <div className="flex gap-4">
                  <MultiSelectPopover
                    title="Role"
                    showIcon
                    value={selectedRole}
                    roleOptions={userTypeConfig}
                    onChange={(val) => {
                      setSelectedRole(val);
                    }}
                  />

                  <CustomButton variantType="outline" sizeType="md" className="rounded-xl gap-2 min-w-fit">
                    <DownloadIcon width={20} height={20} />
                    Export
                  </CustomButton>
                </div>
              }
              columns={columns}
              rows={rows}
              paginationModel={paginationModel}
              rowCount={rowCount}
              loading={loading}
              onPaginationModelChange={setPaginationModel}
              height="calc(100vh - 12rem)"
              getRowId={(row) => row._id}
            />
          </div>
        </Card>
      </div>

      {/*  Delete Confirmation Dialog */}
      <CustomDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete User"
        size="sm"
        actions={
          <>
            <CustomButton variantType="outline" sizeType="md" onClick={() => setOpenDelete(false)}>
              Cancel
            </CustomButton>

            <CustomButton variantType="destructive" sizeType="md" onClick={confirmDelete}>
              Delete
            </CustomButton>
          </>
        }
      >
        <p>
          Are you sure you want to delete user <b>{selectedUser?.name}</b>?
        </p>
      </CustomDialog>
    </>
  );
}
