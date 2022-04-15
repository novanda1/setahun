import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui'
import {
  ArcElement,
  CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js'
import CTA from 'components/CTA'
import SectionTitle from 'components/Typography/SectionTitle'
import useUsers from 'hooks/useUsers'
import { EditIcon, TrashIcon } from 'icons'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
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
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const users = useUsers({ perPage: resultsPerPage, page, query: "haloo" })

  const onPageChange = (p: number) => {
    setPage(p)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  // badge type
  const badgeType = (role: string) => {
    if (role === "admin") return "primary"
    else if (role === "moderator") return "success"
    else return "neutral"
  }

  return (
    <Layout>
      <Head>
        <title>User - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendi repudiandae
          voluptatem tempore!
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
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