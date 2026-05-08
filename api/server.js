export default function handler(req, res) {
    const priceList = {
        casino: {
            section: "CASINO SERVICES",
            items: [
                {
                    id: 1,
                    title: "SEWA TEMPAT (PRIVATE CASINO)",
                    description: "Ruang Private Casino untuk 10 Person maksimal 1 jam",
                    price: "$50.000",
                    details: "Maximum 10 orang nggak boleh lebih. Setelah selesai boleh di ganti dengan pembooking selanjutnya."
                },
                {
                    id: 2,
                    title: "CASINO TICKETS",
                    description: "Tickets untuk akses casino",
                    price: "$20.000",
                    details: "Include 1 Paket makan dan minimum"
                },
                {
                    id: 3,
                    title: "CASINO ENTRY",
                    description: "Casino entry untuk tamu",
                    price: "$10.000",
                    details: "Akses ke area casino"
                }
            ]
        },
        hotel: {
            section: "HOTEL ACCOMMODATIONS",
            items: [
                {
                    id: 4,
                    title: "BIAYA KAMAR (INCLUDE HT PROTECTION)",
                    description: "1/2 Hari (1x Badai)",
                    price: "$100.000",
                    details: "Kamar hotel Maksimal 2 Tamu. Mendapatkan 1 kunci perkamar dan untuk tamu kedua akan di kenakan biaya perlindugan sebesar $50.000"
                },
                {
                    id: 5,
                    title: "DEPOSIT KUNCI",
                    description: "Security deposit untuk kunci kamar",
                    price: "$100.000",
                    details: "Refundable deposit"
                },
                {
                    id: 6,
                    title: "SEWA TEMPAT MEETING",
                    description: "Sewa Tempat Meeting 2 Jam",
                    price: "$50.000",
                    details: "Includes: 5 Package 1 Food & drink + 2 Wines"
                },
                {
                    id: 7,
                    title: "KAMAR HOTEL MAKSIMAL 2 TAMU",
                    description: "Maximum occupancy per room",
                    price: "2 Tamu",
                    details: "Tamu Hanya Mendapatkan 1 kunci perkamar dan untuk tamu kedua akan di kenakan biaya perlindungan sebesar $50.000"
                }
            ]
        },
        medical: {
            section: "MEDICAL SERVICES",
            items: [
                {
                    id: 8,
                    title: "REGULASI DOKTER PRIBADI THE CONTINENTAL - TREATMENT",
                    description: "Basic medical treatment",
                    price: "$2.000",
                    details: "Treatment dasar"
                },
                {
                    id: 9,
                    title: "PERLUKA / MEMAR",
                    description: "Treatment untuk luka atau memar",
                    price: "+$100",
                    details: "Tambahan biaya untuk luka atau memar"
                },
                {
                    id: 10,
                    title: "PINGSAN (UNCONSCIOUS)",
                    description: "Treatment untuk pingsan",
                    price: "$5.000",
                    details: "Penanganan untuk pasien pingsan"
                },
                {
                    id: 11,
                    title: "OPERASI",
                    description: "Surgical procedure",
                    price: "Start $45.000+",
                    details: "Untuk Operasi disesuaikan dengan tingkat kesulitan dan lukanya Start dari 45000"
                }
            ]
        }
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(priceList);
}