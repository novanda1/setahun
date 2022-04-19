const { writeFile, readFileSync } = require("fs");

const data = {
  Sheet1: [
    {
      "Sertifikat Belum Diambil": "NO HAK",
    },
    {
      "Sertifikat Belum Diambil":
        "Sertifikat Sudah Diambil",
    },
    {
      "Sertifikat Belum Diambil": "NO HAK",
    },
    {
      "Sertifikat Belum Diambil":
        "no bisa sama dengan desa lain",
    },
    {
      "Sertifikat Belum Diambil":
        "yang diinput bukan hanya nomor tapi juga huruf",
    },
    {
      "Sertifikat Belum Diambil": "NO HAK",
    },
    {
      "Sertifikat Belum Diambil": "HM 01311",
    },
  ],
  Sheet2: [
    {
      KODE: "02.",
      KECAMATAN: "Bandung",
      KODE_1: "02.08",
      "DESA/KELURAHAN": "Bandung",
    },
    {
      KODE_1: "02.03",
      "DESA/KELURAHAN": "Bantengan",
    },
    {
      KODE_1: "02.16",
      "DESA/KELURAHAN": "Bulus",
    },
    {
      KODE_1: "02.15",
      "DESA/KELURAHAN": "Gandong",
    },
    {
      KODE_1: "02.04",
      "DESA/KELURAHAN": "Kedungwilut",
    },
    {
      KODE_1: "02.14",
      "DESA/KELURAHAN": "Kesambi",
    },
    {
      KODE_1: "02.09",
      "DESA/KELURAHAN": "Mergayu",
    },
    {
      KODE_1: "02.17",
      "DESA/KELURAHAN": "Ngepeh",
    },
    {
      KODE_1: "02.01",
      "DESA/KELURAHAN": "Nglampir",
    },
    {
      KODE_1: "02.06",
      "DESA/KELURAHAN": "Ngunggahan",
    },
    {
      KODE_1: "02.10",
      "DESA/KELURAHAN": "Sebalor",
    },
    {
      KODE_1: "02.12",
      "DESA/KELURAHAN": "Singgit",
    },
    {
      KODE_1: "02.18",
      "DESA/KELURAHAN": "Soko",
    },
    {
      KODE_1: "02.11",
      "DESA/KELURAHAN": "Sukoharjo",
    },
    {
      KODE_1: "02.07",
      "DESA/KELURAHAN": "Suruhan Kidul",
    },
    {
      KODE_1: "02.13",
      "DESA/KELURAHAN": "Suruhan Lor",
    },
    {
      KODE_1: "02.05",
      "DESA/KELURAHAN": "Suwaru",
    },
    {
      KODE_1: "02.02",
      "DESA/KELURAHAN": "Talun Kulon",
    },
    {
      KODE: "01.",
      KECAMATAN: "Besuki",
      KODE_1: "01.04",
      "DESA/KELURAHAN": "Besole",
    },
    {
      KODE_1: "01.03",
      "DESA/KELURAHAN": "Besuki",
    },
    {
      KODE_1: "01.02",
      "DESA/KELURAHAN": "Keboireng",
    },
    {
      KODE_1: "01.01",
      "DESA/KELURAHAN": "Sedayugunung",
    },
    {
      KODE_1: "01.09",
      "DESA/KELURAHAN": "Siyotobagus",
    },
    {
      KODE_1: "01.07",
      "DESA/KELURAHAN": "Tanggulkudung",
    },
    {
      KODE_1: "01.06",
      "DESA/KELURAHAN": "Tanggulturus",
    },
    {
      KODE_1: "01.05",
      "DESA/KELURAHAN": "Tanggulwelahan",
    },
    {
      KODE_1: "01.10",
      "DESA/KELURAHAN": "Tulungrejo",
    },
    {
      KODE_1: "01.08",
      "DESA/KELURAHAN": "Wateskroyo",
    },
    {
      KODE: "11",
      KECAMATAN: "Boyolangu",
      KODE_1: "11.12",
      "DESA/KELURAHAN": "Beji",
    },
    {
      KODE_1: "11.17",
      "DESA/KELURAHAN": "Bono",
    },
    {
      KODE_1: "11.03",
      "DESA/KELURAHAN": "Boyolangu",
    },
    {
      KODE_1: "11.14",
      "DESA/KELURAHAN": "Gedangsewu",
    },
    {
      KODE_1: "11.07",
      "DESA/KELURAHAN": "Karangrejo",
    },
    {
      KODE_1: "11.02",
      "DESA/KELURAHAN": "Kendalbulur",
    },
    {
      KODE_1: "11.09",
      "DESA/KELURAHAN": "Kepuh",
    },
    {
      KODE_1: "11.15",
      "DESA/KELURAHAN": "Moyoketen",
    },
    {
      KODE_1: "11.01",
      "DESA/KELURAHAN": "Ngranti",
    },
    {
      KODE_1: "11.04",
      "DESA/KELURAHAN": "Pucungkidul",
    },
    {
      KODE_1: "11.05",
      "DESA/KELURAHAN": "Sanggrahan",
    },
    {
      KODE_1: "11.11",
      "DESA/KELURAHAN": "Serut",
    },
    {
      KODE_1: "11.13",
      "DESA/KELURAHAN": "Sobontoro",
    },
    {
      KODE_1: "11.10",
      "DESA/KELURAHAN": "Tanjungsari",
    },
    {
      KODE_1: "11.06",
      "DESA/KELURAHAN": "Wajak Kidul",
    },
    {
      KODE_1: "11.08",
      "DESA/KELURAHAN": "Wajak Lor",
    },
    {
      KODE_1: "11.16",
      "DESA/KELURAHAN": "Waung",
    },
    {
      KODE: "04.",
      KECAMATAN: "Campurdarat",
      KODE_1: "04.05",
      "DESA/KELURAHAN": "Campurdarat",
    },
    {
      KODE_1: "04.04",
      "DESA/KELURAHAN": "Gamping",
    },
    {
      KODE_1: "04.03",
      "DESA/KELURAHAN": "Gedangan",
    },
    {
      KODE_1: "04.01",
      "DESA/KELURAHAN": "Ngentrong",
    },
    {
      KODE_1: "04.07",
      "DESA/KELURAHAN": "Pelem",
    },
    {
      KODE_1: "04.08",
      "DESA/KELURAHAN": "Pojok",
    },
    {
      KODE_1: "04.02",
      "DESA/KELURAHAN": "Sawo",
    },
    {
      KODE_1: "04.09",
      "DESA/KELURAHAN": "Tanggung",
    },
    {
      KODE_1: "04.06",
      "DESA/KELURAHAN": "Wates",
    },
    {
      KODE: "12",
      KECAMATAN: "Gondang",
      KODE_1: "12.09",
      "DESA/KELURAHAN": "Bendo",
    },
    {
      KODE_1: "12.12",
      "DESA/KELURAHAN": "Bendungan",
    },
    {
      KODE_1: "12.17",
      "DESA/KELURAHAN": "Blendis",
    },
    {
      KODE_1: "12.04",
      "DESA/KELURAHAN": "Dukuh",
    },
    {
      KODE_1: "12.11",
      "DESA/KELURAHAN": "Gondang",
    },
    {
      KODE_1: "12.03",
      "DESA/KELURAHAN": "Gondosuli",
    },
    {
      KODE_1: "12.20",
      "DESA/KELURAHAN": "Jarakan",
    },
    {
      KODE_1: "12.01",
      "DESA/KELURAHAN": "Kendal",
    },
    {
      KODE_1: "12.07",
      "DESA/KELURAHAN": "Kiping",
    },
    {
      KODE_1: "12.06",
      "DESA/KELURAHAN": "Macanbang",
    },
    {
      KODE_1: "12.13",
      "DESA/KELURAHAN": "Mojoarum",
    },
    {
      KODE_1: "12.10",
      "DESA/KELURAHAN": "Ngrendeng",
    },
    {
      KODE_1: "12.15",
      "DESA/KELURAHAN": "Notorejo",
    },
    {
      KODE_1: "12.08",
      "DESA/KELURAHAN": "Rejosari",
    },
    {
      KODE_1: "12.05",
      "DESA/KELURAHAN": "Sepatan",
    },
    {
      KODE_1: "12.16",
      "DESA/KELURAHAN": "Sidem",
    },
    {
      KODE_1: "12.14",
      "DESA/KELURAHAN": "Sidomulyo",
    },
    {
      KODE_1: "12.02",
      "DESA/KELURAHAN": "Tawing",
    },
    {
      KODE_1: "12.18",
      "DESA/KELURAHAN": "Tiudan",
    },
    {
      KODE_1: "12.19",
      "DESA/KELURAHAN": "Wonokromo",
    },
    {
      KODE: "07.",
      KECAMATAN: "Kalidawir",
      KODE_1: "07.04",
      "DESA/KELURAHAN": "Banyu Urip",
    },
    {
      KODE_1: "07.15",
      "DESA/KELURAHAN": "Betak",
    },
    {
      KODE_1: "07.17",
      "DESA/KELURAHAN": "Domasan",
    },
    {
      KODE_1: "07.13",
      "DESA/KELURAHAN": "Jabon",
    },
    {
      KODE_1: "07.06",
      "DESA/KELURAHAN": "Joho",
    },
    {
      KODE_1: "07.01",
      "DESA/KELURAHAN": "Kalibatur",
    },
    {
      KODE_1: "07.09",
      "DESA/KELURAHAN": "Kalidawir",
    },
    {
      KODE_1: "07.08",
      "DESA/KELURAHAN": "Karangtanlun",
    },
    {
      KODE_1: "07.10",
      "DESA/KELURAHAN": "Ngubalan",
    },
    {
      KODE_1: "07.14",
      "DESA/KELURAHAN": "Pagersari",
    },
    {
      KODE_1: "07.07",
      "DESA/KELURAHAN": "Pakisaji",
    },
    {
      KODE_1: "07.02",
      "DESA/KELURAHAN": "Rejosari",
    },
    {
      KODE_1: "07.11",
      "DESA/KELURAHAN": "Salakkembang",
    },
    {
      KODE_1: "07.03",
      "DESA/KELURAHAN": "Sukorejo Kulon",
    },
    {
      KODE_1: "07.16",
      "DESA/KELURAHAN": "Tanjung",
    },
    {
      KODE_1: "07.12",
      "DESA/KELURAHAN": "Tunggangri",
    },
    {
      KODE_1: "07.05",
      "DESA/KELURAHAN": "Winong",
    },
    {
      KODE: "17",
      KECAMATAN: "Karangrejo",
      KODE_1: "17.02",
      "DESA/KELURAHAN": "Babadan",
    },
    {
      KODE_1: "17.01",
      "DESA/KELURAHAN": "Bungur",
    },
    {
      KODE_1: "17.07",
      "DESA/KELURAHAN": "Gedangan",
    },
    {
      KODE_1: "17.13",
      "DESA/KELURAHAN": "Jeli",
    },
    {
      KODE_1: "17.09",
      "DESA/KELURAHAN": "Karangrejo",
    },
    {
      KODE_1: "17.11",
      "DESA/KELURAHAN": "Punjul",
    },
    {
      KODE_1: "17.04",
      "DESA/KELURAHAN": "Sembon",
    },
    {
      KODE_1: "17.08",
      "DESA/KELURAHAN": "Sukodono",
    },
    {
      KODE_1: "17.10",
      "DESA/KELURAHAN": "Sukorejo",
    },
    {
      KODE_1: "17.05",
      "DESA/KELURAHAN": "Sukowidodo",
    },
    {
      KODE_1: "17.03",
      "DESA/KELURAHAN": "Sukowiyono",
    },
    {
      KODE_1: "17.06",
      "DESA/KELURAHAN": "Tanjungsari",
    },
    {
      KODE_1: "17.12",
      "DESA/KELURAHAN": "Tulungrejo",
    },
    {
      KODE: "13",
      KECAMATAN: "Kauman",
      KODE_1: "13.04",
      "DESA/KELURAHAN": "Balerejo",
    },
    {
      KODE_1: "13.12",
      "DESA/KELURAHAN": "Banaran",
    },
    {
      KODE_1: "13.05",
      "DESA/KELURAHAN": "Batangsaren",
    },
    {
      KODE_1: "13.02",
      "DESA/KELURAHAN": "Bolorejo",
    },
    {
      KODE_1: "13.13",
      "DESA/KELURAHAN": "Jatimulyo",
    },
    {
      KODE_1: "13.08",
      "DESA/KELURAHAN": "Kalangbret",
    },
    {
      KODE_1: "13.10",
      "DESA/KELURAHAN": "Karanganom",
    },
    {
      KODE_1: "13.11",
      "DESA/KELURAHAN": "Kates",
    },
    {
      KODE_1: "13.03",
      "DESA/KELURAHAN": "Kauman",
    },
    {
      KODE_1: "13.09",
      "DESA/KELURAHAN": "Mojosari",
    },
    {
      KODE_1: "13.06",
      "DESA/KELURAHAN": "Panggungrejo",
    },
    {
      KODE_1: "13.01",
      "DESA/KELURAHAN": "Pucangan",
    },
    {
      KODE_1: "13.07",
      "DESA/KELURAHAN": "Sidorejo",
    },
    {
      KODE: "15",
      KECAMATAN: "Kedungwaru",
      KODE_1: "15.06",
      "DESA/KELURAHAN": "Bangoan",
    },
    {
      KODE_1: "15.19",
      "DESA/KELURAHAN": "Boro",
    },
    {
      KODE_1: "15.05",
      "DESA/KELURAHAN": "Bulusari",
    },
    {
      KODE_1: "15.16",
      "DESA/KELURAHAN": "Gendingan",
    },
    {
      KODE_1: "15.08",
      "DESA/KELURAHAN": "Kedungwaru",
    },
    {
      KODE_1: "15.15",
      "DESA/KELURAHAN": "Ketanon",
    },
    {
      KODE_1: "15.04",
      "DESA/KELURAHAN": "Loderesan",
    },
    {
      KODE_1: "15.13",
      "DESA/KELURAHAN": "Majan",
    },
    {
      KODE_1: "15.10",
      "DESA/KELURAHAN": "Mangunsari",
    },
    {
      KODE_1: "15.18",
      "DESA/KELURAHAN": "Ngujang",
    },
    {
      KODE_1: "15.09",
      "DESA/KELURAHAN": "Plandaan",
    },
    {
      KODE_1: "15.01",
      "DESA/KELURAHAN": "Plosokandang",
    },
    {
      KODE_1: "15.07",
      "DESA/KELURAHAN": "Rejoagung",
    },
    {
      KODE_1: "15.03",
      "DESA/KELURAHAN": "Ringinpitu",
    },
    {
      KODE_1: "15.14",
      "DESA/KELURAHAN": "Simo",
    },
    {
      KODE_1: "15.17",
      "DESA/KELURAHAN": "Tapan",
    },
    {
      KODE_1: "15.11",
      "DESA/KELURAHAN": "Tawangsari",
    },
    {
      KODE_1: "15.02",
      "DESA/KELURAHAN": "Tunggulsari",
    },
    {
      KODE_1: "15.12",
      "DESA/KELURAHAN": "Winong",
    },
    {
      KODE: "16",
      KECAMATAN: "Ngantru",
      KODE_1: "16.13",
      "DESA/KELURAHAN": "Banjarsari",
    },
    {
      KODE_1: "16.12",
      "DESA/KELURAHAN": "Batokan",
    },
    {
      KODE_1: "16.06",
      "DESA/KELURAHAN": "Bendosari",
    },
    {
      KODE_1: "16.10",
      "DESA/KELURAHAN": "Kepuhrejo",
    },
    {
      KODE_1: "16.11",
      "DESA/KELURAHAN": "Mojoagung",
    },
    {
      KODE_1: "16.07",
      "DESA/KELURAHAN": "Ngantru",
    },
    {
      KODE_1: "16.04",
      "DESA/KELURAHAN": "Padangan",
    },
    {
      KODE_1: "16.01",
      "DESA/KELURAHAN": "Pakel",
    },
    {
      KODE_1: "16.05",
      "DESA/KELURAHAN": "Pinggirsari",
    },
    {
      KODE_1: "16.09",
      "DESA/KELURAHAN": "Pojok",
    },
    {
      KODE_1: "16.02",
      "DESA/KELURAHAN": "Pucunglor",
    },
    {
      KODE_1: "16.08",
      "DESA/KELURAHAN": "Pulerejo",
    },
    {
      KODE_1: "16.03",
      "DESA/KELURAHAN": "Srikaton",
    },
    {
      KODE: "09.",
      KECAMATAN: "Ngunut",
      KODE_1: "09.01",
      "DESA/KELURAHAN": "Balesono",
    },
    {
      KODE_1: "09.10",
      "DESA/KELURAHAN": "Gilang",
    },
    {
      KODE_1: "09.05",
      "DESA/KELURAHAN": "Kacangan",
    },
    {
      KODE_1: "09.09",
      "DESA/KELURAHAN": "Kalangan",
    },
    {
      KODE_1: "09.11",
      "DESA/KELURAHAN": "Kaliwungu",
    },
    {
      KODE_1: "09.04",
      "DESA/KELURAHAN": "Karangsono",
    },
    {
      KODE_1: "09.16",
      "DESA/KELURAHAN": "Kromasan",
    },
    {
      KODE_1: "09.12",
      "DESA/KELURAHAN": "Ngunut",
    },
    {
      KODE_1: "09.06",
      "DESA/KELURAHAN": "Pandansari",
    },
    {
      KODE_1: "09.17",
      "DESA/KELURAHAN": "Pulosari",
    },
    {
      KODE_1: "09.18",
      "DESA/KELURAHAN": "Pulotondo",
    },
    {
      KODE_1: "09.15",
      "DESA/KELURAHAN": "Purworejo",
    },
    {
      KODE_1: "09.03",
      "DESA/KELURAHAN": "Samir",
    },
    {
      KODE_1: "09.02",
      "DESA/KELURAHAN": "Selorejo",
    },
    {
      KODE_1: "09.14",
      "DESA/KELURAHAN": "Sumberejo Kulon",
    },
    {
      KODE_1: "09.13",
      "DESA/KELURAHAN": "Sumberejo Wetan",
    },
    {
      KODE_1: "09.08",
      "DESA/KELURAHAN": "Sumberingin Kidul",
    },
    {
      KODE_1: "09.07",
      "DESA/KELURAHAN": "Sumberingin Kulon",
    },
    {
      KODE: "19",
      KECAMATAN: "Pagerwojo",
      KODE_1: "19.11",
      "DESA/KELURAHAN": "Gambiran",
    },
    {
      KODE_1: "19.10",
      "DESA/KELURAHAN": "Gondanggunung",
    },
    {
      KODE_1: "19.02",
      "DESA/KELURAHAN": "Kedungcangkring",
    },
    {
      KODE_1: "19.08",
      "DESA/KELURAHAN": "Kradinan",
    },
    {
      KODE_1: "19.03",
      "DESA/KELURAHAN": "Mulyosari",
    },
    {
      KODE_1: "19.09",
      "DESA/KELURAHAN": "Pagerwojo",
    },
    {
      KODE_1: "19.05",
      "DESA/KELURAHAN": "Penjore",
    },
    {
      KODE_1: "19.06",
      "DESA/KELURAHAN": "Samar",
    },
    {
      KODE_1: "19.04",
      "DESA/KELURAHAN": "Segawe",
    },
    {
      KODE_1: "19.07",
      "DESA/KELURAHAN": "Sidomulyo",
    },
    {
      KODE_1: "19.01",
      "DESA/KELURAHAN": "Wonorejo",
    },
    {
      KODE: "03.",
      KECAMATAN: "Pakel",
      KODE_1: "03.15",
      "DESA/KELURAHAN": "Bangunjaya",
    },
    {
      KODE_1: "03.12",
      "DESA/KELURAHAN": "Bangunmulyo",
    },
    {
      KODE_1: "03.02",
      "DESA/KELURAHAN": "Bono",
    },
    {
      KODE_1: "03.04",
      "DESA/KELURAHAN": "Duwet",
    },
    {
      KODE_1: "03.17",
      "DESA/KELURAHAN": "Gebang",
    },
    {
      KODE_1: "03.19",
      "DESA/KELURAHAN": "Gempolan",
    },
    {
      KODE_1: "03.18",
      "DESA/KELURAHAN": "Gesikan",
    },
    {
      KODE_1: "03.08",
      "DESA/KELURAHAN": "Gombang",
    },
    {
      KODE_1: "03.13",
      "DESA/KELURAHAN": "Kesreman",
    },
    {
      KODE_1: "03.06",
      "DESA/KELURAHAN": "Ngebong",
    },
    {
      KODE_1: "03.16",
      "DESA/KELURAHAN": "Ngrance",
    },
    {
      KODE_1: "03.09",
      "DESA/KELURAHAN": "Pakel",
    },
    {
      KODE_1: "03.11",
      "DESA/KELURAHAN": "Pecuk",
    },
    {
      KODE_1: "03.01",
      "DESA/KELURAHAN": "Sambitan",
    },
    {
      KODE_1: "03.14",
      "DESA/KELURAHAN": "Sanan",
    },
    {
      KODE_1: "03.07",
      "DESA/KELURAHAN": "Sodo",
    },
    {
      KODE_1: "03.03",
      "DESA/KELURAHAN": "Sukoanyar",
    },
    {
      KODE_1: "03.10",
      "DESA/KELURAHAN": "Suwaluh",
    },
    {
      KODE_1: "03.05",
      "DESA/KELURAHAN": "Tamban",
    },
    {
      KODE: "06.",
      KECAMATAN: "Pucanglaban",
      KODE_1: "06.09",
      "DESA/KELURAHAN": "Demuk",
    },
    {
      KODE_1: "06.02",
      "DESA/KELURAHAN": "Kalidawe",
    },
    {
      KODE_1: "06.05",
      "DESA/KELURAHAN": "Kaligentong",
    },
    {
      KODE_1: "06.01",
      "DESA/KELURAHAN": "Manding",
    },
    {
      KODE_1: "06.07",
      "DESA/KELURAHAN": "Panggungkalak",
    },
    {
      KODE_1: "06.03",
      "DESA/KELURAHAN": "Panggunguni",
    },
    {
      KODE_1: "06.06",
      "DESA/KELURAHAN": "Pucanglaban",
    },
    {
      KODE_1: "06.04",
      "DESA/KELURAHAN": "Sumberbendo",
    },
    {
      KODE_1: "06.08",
      "DESA/KELURAHAN": "Sumberdadap",
    },
    {
      KODE: "08.",
      KECAMATAN: "Rejotangan",
      KODE_1: "08.14",
      "DESA/KELURAHAN": "Aryojeding",
    },
    {
      KODE_1: "08.07",
      "DESA/KELURAHAN": "Banjarejo",
    },
    {
      KODE_1: "08.11",
      "DESA/KELURAHAN": "Blimbing",
    },
    {
      KODE_1: "08.16",
      "DESA/KELURAHAN": "Buntaran",
    },
    {
      KODE_1: "08.06",
      "DESA/KELURAHAN": "Jatidowo",
    },
    {
      KODE_1: "08.03",
      "DESA/KELURAHAN": "Karangsari",
    },
    {
      KODE_1: "08.12",
      "DESA/KELURAHAN": "Pakisrejo",
    },
    {
      KODE_1: "08.02",
      "DESA/KELURAHAN": "Panjerejo",
    },
    {
      KODE_1: "08.10",
      "DESA/KELURAHAN": "Rejotangan",
    },
    {
      KODE_1: "08.05",
      "DESA/KELURAHAN": "Sukorejo Wetan",
    },
    {
      KODE_1: "08.09",
      "DESA/KELURAHAN": "Sumberagung",
    },
    {
      KODE_1: "08.08",
      "DESA/KELURAHAN": "Tanen",
    },
    {
      KODE_1: "08.13",
      "DESA/KELURAHAN": "Tegalrejo",
    },
    {
      KODE_1: "08.01",
      "DESA/KELURAHAN": "Tenggong",
    },
    {
      KODE_1: "08.15",
      "DESA/KELURAHAN": "Tenggur",
    },
    {
      KODE_1: "08.04",
      "DESA/KELURAHAN": "Tugu",
    },
    {
      KODE: "18",
      KECAMATAN: "Sendang",
      KODE_1: "18.04",
      "DESA/KELURAHAN": "Dono",
    },
    {
      KODE_1: "18.11",
      "DESA/KELURAHAN": "Geger",
    },
    {
      KODE_1: "18.01",
      "DESA/KELURAHAN": "Kedoyo",
    },
    {
      KODE_1: "18.05",
      "DESA/KELURAHAN": "Krosok",
    },
    {
      KODE_1: "18.10",
      "DESA/KELURAHAN": "Nglurup",
    },
    {
      KODE_1: "18.02",
      "DESA/KELURAHAN": "Ngluntung",
    },
    {
      KODE_1: "18.08",
      "DESA/KELURAHAN": "Nyawangan",
    },
    {
      KODE_1: "18.07",
      "DESA/KELURAHAN": "Picisan",
    },
    {
      KODE_1: "18.09",
      "DESA/KELURAHAN": "Sendang",
    },
    {
      KODE_1: "18.03",
      "DESA/KELURAHAN": "Talang",
    },
    {
      KODE_1: "18.06",
      "DESA/KELURAHAN": "Tugu",
    },
    {
      KODE: "10",
      KECAMATAN: "Sumbergempol",
      KODE_1: "10.12",
      "DESA/KELURAHAN": "Bendiljati Kulon",
    },
    {
      KODE_1: "10.13",
      "DESA/KELURAHAN": "Bendiljati Wetan",
    },
    {
      KODE_1: "10.07",
      "DESA/KELURAHAN": "Bendilwungu",
    },
    {
      KODE_1: "10.17",
      "DESA/KELURAHAN": "Bukur",
    },
    {
      KODE_1: "10.10",
      "DESA/KELURAHAN": "Doroampel",
    },
    {
      KODE_1: "10.15",
      "DESA/KELURAHAN": "Jabalsari",
    },
    {
      KODE_1: "10.01",
      "DESA/KELURAHAN": "Junjung",
    },
    {
      KODE_1: "10.05",
      "DESA/KELURAHAN": "Mirigambar",
    },
    {
      KODE_1: "10.02",
      "DESA/KELURAHAN": "Podorejo",
    },
    {
      KODE_1: "10.04",
      "DESA/KELURAHAN": "Sambidoplang",
    },
    {
      KODE_1: "10.08",
      "DESA/KELURAHAN": "Sambijajar",
    },
    {
      KODE_1: "10.16",
      "DESA/KELURAHAN": "Sambirobyong",
    },
    {
      KODE_1: "10.14",
      "DESA/KELURAHAN": "Sumberdadi",
    },
    {
      KODE_1: "10.09",
      "DESA/KELURAHAN": "Tambakrejo",
    },
    {
      KODE_1: "10.06",
      "DESA/KELURAHAN": "Trenceng",
    },
    {
      KODE_1: "10.03",
      "DESA/KELURAHAN": "Wates",
    },
    {
      KODE_1: "10.11",
      "DESA/KELURAHAN": "Wonorejo",
    },
    {
      KODE: "05.",
      KECAMATAN: "Tanggung Gunung",
      KODE_1: "05.02",
      "DESA/KELURAHAN": "Jenglungharjo",
    },
    {
      KODE_1: "05.03",
      "DESA/KELURAHAN": "Kresikan",
    },
    {
      KODE_1: "05.05",
      "DESA/KELURAHAN": "Ngepoh",
    },
    {
      KODE_1: "05.01",
      "DESA/KELURAHAN": "Ngrejo",
    },
    {
      KODE_1: "05.07",
      "DESA/KELURAHAN": "Pakisrejo",
    },
    {
      KODE_1: "05.04",
      "DESA/KELURAHAN": "Tanggung Gunung",
    },
    {
      KODE_1: "05.06",
      "DESA/KELURAHAN": "Tenggangrejo",
    },
    {
      KODE: "14",
      KECAMATAN: "Tulungagung",
      KODE_1: "14.07",
      "DESA/KELURAHAN": "Bago",
    },
    {
      KODE_1: "14.13",
      "DESA/KELURAHAN": "Botoran",
    },
    {
      KODE_1: "14.06",
      "DESA/KELURAHAN": "Jepun",
    },
    {
      KODE_1: "14.09",
      "DESA/KELURAHAN": "Kampungdalem",
    },
    {
      KODE_1: "14.04",
      "DESA/KELURAHAN": "Karangwaru",
    },
    {
      KODE_1: "14.10",
      "DESA/KELURAHAN": "Kauman",
    },
    {
      KODE_1: "14.01",
      "DESA/KELURAHAN": "Kedungsoko",
    },
    {
      KODE_1: "14.14",
      "DESA/KELURAHAN": "Kenayan",
    },
    {
      KODE_1: "14.08",
      "DESA/KELURAHAN": "Kepatihan",
    },
    {
      KODE_1: "14.02",
      "DESA/KELURAHAN": "Kutoanyar",
    },
    {
      KODE_1: "14.12",
      "DESA/KELURAHAN": "Panggungrejo",
    },
    {
      KODE_1: "14.11",
      "DESA/KELURAHAN": "Sembung",
    },
    {
      KODE_1: "14.",
      "DESA/KELURAHAN": "Tamanan",
    },
    {
      KODE_1: "14.",
      "DESA/KELURAHAN": "Tertek",
    },
  ],
  Sheet3: [
    {
      Uraian: "01. Ganti Nadzir",
    },
    {
      Uraian:
        "02. Ganti Nama Pemegang Hak Tanggungan",
    },
    {
      Uraian: "03. Merger Hak Tanggungan",
    },
    {
      Uraian: "04. Pemecahan Bidang",
    },
    {
      Uraian: "05. Pemisahan Bidang",
    },
    {
      Uraian:
        "06. Pencatatan Perubahan Penggunaan Tanah",
    },
    {
      Uraian: "07. Pendaftaran SK Hak",
    },
    {
      Uraian:
        "08. Pendaftaran Tanah Pertama Kali Pengakuan/Penegasan Hak",
    },
    {
      Uraian:
        "09. Pendaftaran Tanah Pertama Kali Wakaf untuk Tanah yang Belum Sertifikat",
    },
    {
      Uraian: "10. Penggabungan Bidang",
    },
    {
      Uraian:
        "11. Pengukuran dan Pemetaan Kadastral (Peta Bidang)",
    },
    {
      Uraian: "12. Peralihan Hak - Hibah",
    },
    {
      Uraian: "13. Peralihan Hak - Jual Beli",
    },
    {
      Uraian: "14. Peralihan Hak - Lelang",
    },
    {
      Uraian:
        "15. Peralihan Hak - Pembagian Hak Bersama",
    },
    {
      Uraian: "16. Peralihan Hak - Pewarisan",
    },
    {
      Uraian: "17. Roya",
    },
    {
      Uraian:
        "18. Sertifikat Pengganti Karena Blanko Lama",
    },
    {
      Uraian:
        "19. Sertifikat Pengganti Karena Hilang",
    },
    {
      Uraian:
        "20. Sertifikat Pengganti Karena Rusak",
    },
    {
      Uraian:
        "21. Wakaf dari Tanah yang Sudah Bersertifikat",
    },
  ],
};

const kecamatan = data.Sheet2.filter(
  (s) => s.KECAMATAN
).map((k) => ({
  kecamatan: k.KECAMATAN,
  kode: k.KODE.replaceAll(".", ""),
}));

const desa = data.Sheet2.map((d) => ({
  kode: d.KODE_1,
  desa: d["DESA/KELURAHAN"],
})).map((d) => `${d.kode}: ${d.desa}`);

const uraian = data.Sheet3.map((u) =>
  u.Uraian.split(".")[1].trim()
);

writeFile(
  "uraian.txt",
  JSON.stringify([...new Set(uraian)]),
  (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log(
        "The written has the following contents:"
      );
      console.log(
        readFileSync("uraian.txt", "utf8")
      );
    }
  }
);
