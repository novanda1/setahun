import {
  Badge,
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui';
import {
  ArcElement,
  CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import Cookies from 'cookies';
import useCreateUser from 'hooks/useCreateUser';
import useUsers from 'hooks/useUsers';
import { EditIcon, TrashIcon } from 'icons';
import produce from 'immer';
import { getUserRole, updateToken } from 'lib/jwt';
import { CreateUserDTO } from 'lib/types/User';
import { GetServerSideProps } from "next";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import Layout from '../../containers/Layout';

function Users({ role }: any) {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const { push, query } = useRouter()
  const resultsPerPage = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createUserInput, setCreateUserInput] = useState<CreateUserDTO>(
    {
      email: '',
      password: '',
      passwordConfirm: '',
      user_metadata:
      {
        fullname: '',
        nip: 0,
        unit: ''
      }
    }
  )

  const users = useUsers({ perPage: resultsPerPage, page: query?.page || 1 as number })
  const createUser = useCreateUser(createUserInput)

  const onPageChange = (p: number) => {
    if (query?.page || p > 1)
      push('/users/?page=' + p)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    push('/users/create')
  }

  const onInputChange = useCallback((e) => {
    setCreateUserInput(
      produce((draft: any) => {
        const obj = e.target.name.split('.')
        if (obj.length === 2)
          draft[obj[0]][obj[1]] = e.target.value
        else
          draft[obj[0]] = e.target.value
      })
    )
  }, [])

  // badge type
  const badgeType = (role: string) => {
    if (role === "admin") return "primary"
    else if (role === "moderator") return "success"
    else return "neutral"
  }

  return (
    <Layout role={role}>
      <Head>
        <title>User - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Tambah User Baru</ModalHeader>
        <ModalBody>
          <div className='mt-5'>
            <Label className='mt-4'>
              <span>Email</span>
              <Input
                name="email"
                value={createUserInput.email}
                onChange={onInputChange}
                type="email"
                className="mt-1"
                placeholder="sherlyayu@gmail.com" />
            </Label>
            <Label className='mt-4'>
              <span>Password</span>
              <Input
                name="password"
                value={createUserInput.password}
                onChange={onInputChange}
                type="password"
                className="mt-1"
                placeholder="rahasia" />
            </Label>
            <Label className='mt-4'>
              <span>Konfirmasi Password</span>
              <Input type="password" className="mt-1" placeholder="rahasia" />
            </Label>
            <Label className='mt-4'>
              <span>Nama Lengkap</span>
              <Input
                value={createUserInput.user_metadata.fullname}
                name='user_metadata.fullname'
                onChange={onInputChange}
                className="mt-1"
                placeholder="Sherly Ayu" />
            </Label>
            <Label className='mt-4'>
              <span>NIP</span>
              <Input
                value={createUserInput.user_metadata.nip || ''}
                name="user_metadata.nip"
                onChange={onInputChange}
                type="number"
                className="mt-1"
                placeholder="123123123123" />
            </Label>
            <Label className='mt-4'>
              <span>Unit</span>
              <Input
                name="user_metadata.unit"
                value={createUserInput.user_metadata.unit}
                onChange={onInputChange}
                type="text"
                className="mt-1"
                placeholder="Logistik" />
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <HelperText>{createUser.isError ? createUser.error as string : ''}</HelperText>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Batal
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button
              onClick={() => {
                createUser.mutate(createUserInput, {
                  onSuccess: () => {
                    closeModal()
                  }
                })
              }}>
              {createUser.isLoading ? "Memproses.." : 'Tambah'}
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Batal
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Tambah
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <PageTitle> </PageTitle>
      <div className='flex justify-end mb-4'>
        <Button className='w-full sm:w-auto' onClick={openModal}>
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
            {!users.error && users?.data?.data?.map((user: any, i: number) => (
              <TableRow key={i}>
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
                    <Button layout="link" size="small" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
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
              totalResults={users.data.count}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const cookies = new Cookies(req, res)
  let role = ''

  const token = cookies.get('sb-access-token') || query.token as string || ''
  if (token)
    try {
      role = getUserRole(token)
    }
    catch {
      const newToken = await updateToken(req, res)
      role = getUserRole(newToken)
    }


  return {
    props: {
      role: role
    }
  }
}

export default Users