import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@roketid/windmill-react-ui";
import useDeleteSertifikat from "hooks/useDeleteSertifikat";
import { useSertifikat } from "hooks/useSertifikat";
import { Sertifikat } from "lib/types/Sertifikat";
import { UserRole } from "lib/types/User";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Loader from "components/Loader/Loader";
import TableFilter from "./TableFilter";

type Props = {
  diambil?: boolean;
  role?: UserRole;
};

const SertifikatPage: React.FC<Props> = ({
  diambil = false,
  role = "read-only",
}) => {
  const { push, query } = useRouter();

  // pagination setup
  const perPage = 10;
  const sertifikat = useSertifikat({
    diambil,
    page: +query?.page! || 1,
    perPage,
  });

  // pagination change control
  const onPageChange = (p: number) => {
    if (query?.page || p > 1) push("/users/?page=" + p);
  };

  // table
  const onEditClicked = (id: string) => {
    push("/sertifikat/" + id + "/edit");
  };

  const onDetailClicked = (id: string) => {
    push("/sertifikat/" + id + "/detail");
  };

  // modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteState, setDeleteState] = useState<Sertifikat | null>(null);
  const deleteSertifikat = useDeleteSertifikat();

  const toggleDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    if (deleteState) setDeleteState(null);
  }, [isDeleteModalOpen, deleteState]);

  const onDeleteUser = useCallback(() => {
    if (deleteState)
      deleteSertifikat.mutate(deleteState, {
        onSuccess() {
          toggleDeleteModal();
        },
      });
  }, [deleteState, deleteSertifikat, toggleDeleteModal]);

  return (
    <>
      <TableFilter />
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
                      <p className="font-semibold">
                        {sertifikat.nama_pemegang_hak}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {sertifikat.uraian_pekerjaan}
                      </p>
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
                  <span className="text-sm">
                    {diambil
                      ? new Date(
                          sertifikat.tanggal_pengambilan
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => onDetailClicked(sertifikat.id)}
                      layout="outline"
                      size="small"
                      aria-label="Edit"
                    >
                      {/* <EditIcon className="w-5 h-5" aria-hidden="true" /> */}
                      Lihat Detail
                    </Button>
                    {role === "admin" || role === "moderator" ? (
                      <>
                        <Button
                          onClick={() => onEditClicked(sertifikat.id)}
                          layout="outline"
                          size="small"
                          aria-label="Edit"
                        >
                          {/* <EditIcon className="w-5 h-5" aria-hidden="true" /> */}
                          Ubah
                        </Button>
                        <Button
                          onClick={() => {
                            toggleDeleteModal();
                            setDeleteState(sertifikat);
                          }}
                          layout="outline"
                          size="small"
                          aria-label="Delete"
                        >
                          {/* <TrashIcon className="w-5 h-5" aria-hidden="true" /> */}
                          Hapus
                        </Button>
                      </>
                    ) : null}
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
      <Modal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal}>
        <ModalHeader>Hapus {deleteState?.nama_pemegang_hak}</ModalHeader>
        <ModalBody>
          Yakin menghapus sertifikat dengan nama pemegang hak
          {deleteState?.nama_pemegang_hak}?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button
              layout="outline"
              onClick={toggleDeleteModal}
              disabled={deleteSertifikat.isLoading}
            >
              Batal
            </Button>
          </div>
          <div className="hidden sm:block">
            <button
              disabled={deleteSertifikat.isLoading}
              onClick={onDeleteUser}
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300"
            >
              Hapus
            </button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              layout="outline"
              onClick={toggleDeleteModal}
              disabled={deleteSertifikat.isLoading}
            >
              Batal
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <button
              disabled={deleteSertifikat.isLoading}
              onClick={onDeleteUser}
              className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-3 rounded-lg text-white w-full bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300"
            >
              Hapus
            </button>
          </div>
        </ModalFooter>
      </Modal>
      {sertifikat.isLoading && (
        <div className="">
          <Loader text="Loading sertifikat..." />
        </div>
      )}
    </>
  );
};

export default SertifikatPage;
