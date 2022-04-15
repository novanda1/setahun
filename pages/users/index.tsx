import {
  Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui'
import {
  ArcElement,
  CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js'
import Badge from 'components/Badge'
import Button from 'components/Button'
import useUsers from 'hooks/useUsers'
import { EditIcon, TrashIcon } from 'icons'
import React, { useEffect, useState } from 'react'
import response, { ITableData } from 'utils/demo/tableData'
import PageTitle from '../../components/Typography/PageTitle'
import Layout from '../../containers/Layout'

function Users() {
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

  const resultsPerPage = 10
  const [page, setPage] = useState(1)

  const users = useUsers({ perPage: resultsPerPage, page, query: "haloo" })

  const [data, setData] = useState<ITableData[]>([])

  // pagination setup
  const totalResults = response.length

  // pagination change control
  function onPageChange(p: number) {
    setPage(p)
  }

  // badge type
  const badgeType = (role: string) => {
    if (role === "admin") return "cprimary"
    else if (role === "moderator") return "success"
    else return "neutral"
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <Layout>
      <PageTitle>Users</PageTitle>

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
            {!users.error && users?.data?.data.map((user: any, i: number) => (
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

export default Users