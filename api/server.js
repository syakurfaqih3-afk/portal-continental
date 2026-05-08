export default function handler(req, res) {
    const database = [
        {
            id: 1,
            category: "casino",
            title: "PREMIUM CASINO",
            author: "CEO LAGUNA - TITI MISHIMA",
            description: "Luxury stay. World class play. Feel the thrill, embrace the luck.",
            priceTag: "MIN. BUY-IN : $ 50.000",
            time: "11d ago"
        },
        {
            id: 2,
            category: "hotel",
            title: "LUXURIOUS ROOMS & SUITES",
            author: "MANAGEMENT",
            description: "Include HT Protection. 24/7 Premium service. Unforgettable experience.",
            priceTag: "START : $ 25.000",
            time: "17d ago"
        },
        {
            id: 3,
            category: "restaurant",
            title: "FINE DINING & BAR",
            author: "EXECUTIVE CHEF",
            description: "Lobster Thermidor, Wagyu Burgundy Ribeye, and Signature Drinks.",
            priceTag: "PACKAGE : $ 5.000",
            time: "Just now"
        },
        {
            id: 4,
            category: "spa",
            title: "RELAXING MASSAGE & SPA",
            author: "SPA THERAPIST",
            description: "Indulge, celebrate, elevate every moment. You deserve it.",
            priceTag: "TREATMENT : $ 15.000",
            time: "20d ago"
        },
        {
            id: 5,
            category: "rooftop",
            title: "ROOFTOP POOL & DJ",
            author: "EVENT MANAGER",
            description: "Continental Rooftop. Live the high life with our exclusive pool party.",
            priceTag: "ENTRY : $ 10.000",
            time: "Weekend"
        }
    ];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(database);
}