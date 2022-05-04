import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
} from "@roketid/windmill-react-ui";
import {
  sertifikatArr,
  SertifikatArrType,
  uraianPekerjaan,
} from "lib/types/Sertifikat";
import { CSSProperties, useState } from "react";
import Select2 from "react-select";
import { daerah } from "utils/daerah";
import React from "react";

const FilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="sbui-icon "
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );
};

const groupStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles: CSSProperties = {
  borderRadius: "2em",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

interface Option {
  label: string;
  value: {
    kecamatan: string;
    desa: string;
  };
}

interface GroupedOption {
  label: string;
  options: Option[];
}

const groupedOptions: GroupedOption[] = daerah.map((d) => {
  const options = d.desa.map((ds) => ({
    value: {
      desa: ds.nama,
      kecamatan: d.nama,
    },
    label: ds.nama,
  }));

  return {
    label: d.nama,
    options,
  };
});

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const TableFilter = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState<SertifikatArrType>(
    sertifikatArr[0].type
  );

  const onFilterTypeChange = (e: SertifikatArrType | any) => {
    setFilterType(e.target.value);
  };

  const onOpen = () => {
    setFilterOpen(true);
  };

  const onClose = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <div className="mb-2">
        <Button onClick={onOpen} iconLeft={FilterIcon} layout="link">
          <span className="ml-3"></span>
          Filter / Pencarian
        </Button>
      </div>
      <Modal
        isOpen={filterOpen}
        onClose={onClose}
        style={{ overflow: "visible" }}
      >
        <ModalHeader> Filter / Pencarian</ModalHeader>
        <ModalBody>
          <div className="mb-2">Filter:</div>
          <Select className="mb-4" onChange={onFilterTypeChange}>
            {sertifikatArr.map(({ name, type }) => {
              return (
                <option key={name} value={type}>
                  {name}
                </option>
              );
            })}
          </Select>
          <div className="mb-2">Pencarian:</div>
          {filterType === "text" ? (
            <Input />
          ) : filterType === "number" ? (
            <Input type="number" />
          ) : filterType === "select" ? (
            <Select>
              {uraianPekerjaan.map((val) => (
                <option key={val}>{val}</option>
              ))}
            </Select>
          ) : filterType === "date" ? (
            <Input type="date" />
          ) : filterType === "daerah" ? (
            <Select2<any, false, GroupedOption>
              options={groupedOptions}
              placeholder="Pilih atau ketik untuk mencari"
              formatGroupLabel={formatGroupLabel}
              onChange={
                (daerah: Option) => {}
                //   setFieldValue("daerah", daerah.value)
              }
            />
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={onClose}>
              Batal
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Terapkan</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={onClose}>
              Batal
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button size="large" block>
              Terapkan
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TableFilter;
