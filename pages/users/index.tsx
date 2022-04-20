import {
  Badge,
  Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui';
import Cookies from 'cookies';
import useUsers from 'hooks/useUsers';
import { EditIcon, TrashIcon } from 'icons';
import { getUserRole, updateToken } from 'lib/jwt';
import { GetServerSideProps } from "next";
import Head from 'next/head';
import { useRouter } from 'next/router';
import PageTitle from '../../components/Typography/PageTitle';
import Layout from '../../containers/Layout';

function Users({ role }: any) {
  const { push, query } = useRouter()
  const resultsPerPage = 10

  const users = useUsers({ perPage: resultsPerPage, page: query?.page || 1 as number })

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

  return (
    <Layout role={role}>
      <Head>
        <title>User - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            {!users.error && users?.data?.data?.map((user: any, i: number) => (
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
                    <Button onClick={() => push('/users/edit?id=' + user.id)} layout="link" size="small" aria-label="Edit">
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