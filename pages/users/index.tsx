import {
  Badge,
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui';
import useDeleteUser from 'hooks/useDeleteUser';
import useUsers from 'hooks/useUsers';
import { EditIcon, TrashIcon } from 'icons';
import { getRoleByRequest } from 'lib/api/utils';
import { supabase } from 'lib/supabase';
import { GetServerSideProps } from "next";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import Layout from '../../containers/Layout';

const Users = ({ role }: any) => {
  const { push, query } = useRouter()
  const resultsPerPage = 10

  const users = useUsers({ perPage: resultsPerPage, page: +query?.page! as number || 1 })

  const onPageChange = (p: number) => {
    if (query?.page || p > 1)
      push('/users/?page=' + p)
  }

  const onCreateUser = () => {
    push('/users/create')
  }

  // badge type
  const badgeType = (role: string) => {
    if (role === "admin") return "primary"
    else if (role === "moderator") return "success"
    else return "neutral"
  }

  // modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deleteState, setDeleteState] = useState<any>()
  const deleteUser = useDeleteUser()

  const toggleDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
    if (deleteState) setDeleteState(null)
  }, [isDeleteModalOpen, deleteState])

  const onDeleteUser = useCallback(() => {
    deleteUser.mutate(deleteState, {
      onSuccess() {
        toggleDeleteModal()
      }
    })
  }, [deleteState, deleteUser, toggleDeleteModal])

  return (
    <Layout role={role}>
      <Head>
        <title>User - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal}>
        <ModalHeader>Hapus {deleteState?.fullname}</ModalHeader>
        <ModalBody>Yakin menghapus {deleteState?.fullname}</ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={toggleDeleteModal} disabled={deleteUser.isLoading}>
              Batal
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button disabled={deleteUser.isLoading} onClick={onDeleteUser} className='bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300'>Hapus</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={toggleDeleteModal} disabled={deleteUser.isLoading}>
              Batal
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button disabled={deleteUser.isLoading} onClick={onDeleteUser} className='bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300' block size="large">
              Hapus
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <PageTitle> </PageTitle>
      <div className='flex justify-end mb-4'>
        <Button className='w-full sm:w-auto' onClick={onCreateUser}>
          Tambah User Baru
        </Button>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {!users.error
              && users?.data?.data
                ?.filter(user => user.id !== supabase.auth.user()?.id)
                ?.map((user: any, i: number) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                        <div>
                          <p className="font-semibold">{user.fullname}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.unit}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.nip}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type={badgeType(user.user_roles[0].role)}>{user.user_roles[0].role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button onClick={() => push('/users/edit?id=' + user.id)} layout="outline" size="small" aria-label="Edit">
                          {/* <EditIcon className="w-5 h-5" aria-hidden="true" /> */}
                          Ubah
                        </Button>
                        <Button onClick={() => {
                          toggleDeleteModal()
                          setDeleteState(user)
                        }} layout="outline" size="small" aria-label="Delete">
                          {/* <TrashIcon className="w-5 h-5" aria-hidden="true" /> */}
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TableFooter>
          {
            !users.error
            && !users.isLoading
            && <Pagination
              totalResults={users.data?.count || 0}
              resultsPerPage={resultsPerPage}
              onChange={onPageChange}
              label="Table navigation"
            />
          }
        </TableFooter>
      </TableContainer>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const role = await getRoleByRequest(context)

  return {
    props: {
      role: role
    }
  }
}

export default Users
