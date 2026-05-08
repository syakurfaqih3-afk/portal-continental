// Menggunakan standar Vercel Serverless Function
export default function handler(req, res) {
    const database = [
        {
            id: 1,
            category: "casino",
            title: "PRIVATE CASINO PRICES",
            author: "CEO LAGUNA - TITI MISHIMA",
            description: "ONLY FOR 10 Person for 1 hours.",
            priceTag: "SEWA TEMPAT : $ 50.000",
            time: "11d ago"
        },
        {
            id: 2,
            category: "hotel",
            title: "HOTEL PRICES",
            author: "CEO LAGUNA - TITI MISHIMA",
            description: "Biaya Kamar ( Include HT Protection ) 1/2 Hari ( 1x Badai )",
            priceTag: "START FROM : $ 25.000",
            time: "17d ago"
        },
        {
            id: 3,
            category: "restaurant",
            title: "RESTAURANT MENU (MON-WED)",
            author: "THE CONTINENTAL KITCHEN",
            description: "Main Package ($5,000): Lobster Thermidor. Special Package ($10,000): Isabella 1926 Whiskey.",
            priceTag: "PACKAGE : $ 5.000+",
            time: "Just now"
        },
        {
            id: 4,
            category: "doctor",
            title: "CONTI DOCTOR",
            author: "CEO LAGUNA - TITI MISHIMA",
            description: "Regulasi Dokter Pribadi The Continental Treatment.",
            priceTag: "VARIES",
            time: "20d ago"
        }
    ];

    // Response sukses
    res.status(200).json(database);
}