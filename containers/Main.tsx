import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@roketid/windmill-react-ui";
import CreateCertifiedModalContext from "context/CreateSertifModalContext";
import React, { useContext } from "react";

interface IMain {
  children: React.ReactNode;
}

function Main({ children }: IMain) {
  const { closeCreateCertifiedModal, isCreateCertifiedModalOpen } = useContext(
    CreateCertifiedModalContext
  );

  return (
    <>
      <Modal
        onClose={closeCreateCertifiedModal}
        isOpen={isCreateCertifiedModalOpen}
      >
        <ModalHeader>Tambah Sertifikat</ModalHeader>
        <ModalBody>halo</ModalBody>
        <ModalFooter>
          <div className="flex flex-row gap-3">
            <Button>Tambah</Button>
            <Button layout="outline">Batal</Button>
          </div>
        </ModalFooter>
      </Modal>
      <main className="h-full overflow-y-auto">
        <div className="container grid px-6 mx-auto">{children}</div>
      </main>
    </>
  );
}

export default Main;
