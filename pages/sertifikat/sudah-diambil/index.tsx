import {
  Button,
  Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@roketid/windmill-react-ui'
import { useSertifikat } from 'hooks/useSertifikat'
import { getRoleByRequest } from 'lib/api/utils'
import { Sertifikat } from 'lib/types/Sertifikat'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PageTitle from '../../../components/Typography/PageTitle'
import Layout from '../../../containers/Layout'

function SudahDiambil({ role }: any) {
  const { push, query } = useRouter()

  // pagination setup
  const perPage = 10
  const sertifikat = useSertifikat({ diambil: true, page: +query?.page! || 1, perPage })

  // pagination change control
  const onPageChange = (p: number) => {
    if (query?.page || p > 1)
      push('/users/?page=' + p)
  }

  // table
  const onEditClicked = (id: string) => {
    push('/sertifikat/' + id + '/edit')
  }

  const onDetailClicked = (id: string) => {
    push('/sertifikat/' + id + '/detail')
  }

  return (
    <Layout role={role}>
      <Head>
        <title>Sertifikat Sudah Diambil - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageTitle>Sertifikat Sudah Diambil</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama/Uraian</TableCell>
              <TableCell>No Berkas</TableCell>
              <TableCell>Tahun Berkas</TableCell>
              <TableCell>Tanggal Pengambilan</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {sertifikat.data?.data.map((sertifikat: Sertifikat) => (
              <TableRow
                key={sertifikat.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{sertifikat.nama_pemegang_hak}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{sertifikat.uraian_pekerjaan}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{sertifikat.no_berkas}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{sertifikat.tahun_berkas}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(sertifikat.tanggal_pengambilan).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => onEditClicked(sertifikat.id)}
                      layout="outline" size="small" aria-label="Edit">
                      {/* <EditIcon className="w-5 h-5" aria-hidden="true" /> */}
                      Lihat Detail
                    </Button>
                    <Button
                      onClick={() => onEditClicked(sertifikat.id)}
                      layout="outline" size="small" aria-label="Edit">
                      {/* <EditIcon className="w-5 h-5" aria-hidden="true" /> */}
                      Ubah
                    </Button>
                    <Button layout="outline" size="small" aria-label="Delete">
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
          <Pagination
            totalResults={sertifikat.data?.count || 0}
            resultsPerPage={perPage}
            onChange={onPageChange}
            label="Table navigation"
          />
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

export default SudahDiambil