class Type {
    public static readonly PROPERTY = 'PROPERTY';
    public static readonly STATION = 'STATION';
    public static readonly UTILITY = 'UTILITY';
    public static readonly CHANCE = 'CHANCE';
    public static readonly COMMUNITY_CHEST = 'COMMUNITY_CHEST';
    public static readonly SPECIAL = 'SPECIAL';
}

const Board: Cell[] = [
    {
        name: 'Go',
        type: Type.SPECIAL,
        position: 0
    },
    {
        name: 'Boulevard de Belleville',
        type: Type.PROPERTY,
        position: 1,
        color: 'dark-purple',
        rent: [2, 10, 30, 90, 160, 250],
        price: 60
    },
    {
        name: 'Caisse de Communauté',
        type: Type.COMMUNITY_CHEST,
        position: 2
    },
    {
        name: 'Rue Lecourbe',
        type: Type.PROPERTY,
        position: 3,
        color: 'dark-purple',
        rent: [4, 20, 60, 180, 320, 450],
        price: 60
    },
    {
        name: 'Impôts sur le revenu',
        type: Type.SPECIAL,
        position: 4
    },
    {
        name: 'Gare Montparnasse',
        type: Type.STATION,
        position: 5
    },
    {
        name: 'Rue de Vaugirard',
        type: Type.PROPERTY,
        position: 6,
        color: 'light-blue',
        rent: [6, 30, 90, 270, 400, 550],
        price: 100
    },
    {
        name: 'Chance',
        type: Type.CHANCE,
        position: 7
    },
    {
        name: 'Rue de Courcelles',
        type: Type.PROPERTY,
        position: 8,
        color: 'light-blue',
        rent: [6, 30, 90, 270, 400, 550],
        price: 100
    },
    {
        name: 'Avenue de la République',
        type: Type.PROPERTY,
        position: 9,
        color: 'light-blue',
        rent: [8, 40, 100, 300, 450, 600],
        price: 120
    },
    {
        name: 'En Prison/Simple Visite',
        type: Type.SPECIAL,
        position: 10
    },
    {
        name: 'Boulevard de la Villette',
        type: Type.PROPERTY,
        position: 11,
        color: 'purple',
        rent: [10, 50, 150, 450, 625, 750],
        price: 140
    },
    {
        name: 'Compagnie de Distribution d\'Electricité',
        type: Type.UTILITY,
        position: 12,
        price: 150
    },
    {
        name: 'Avenue de Neuilly',
        type: Type.PROPERTY,
        position: 13,
        color: 'purple',
        rent: [10, 50, 150, 450, 625, 750],
        price: 140
    },
    {
        name: 'Rue de Paradis',
        type: Type.PROPERTY,
        position: 14,
        color: 'purple',
        rent: [12, 60, 180, 500, 700, 900],
        price: 160
    },
    {
        name: 'Gare de Lyon',
        type: Type.STATION,
        position: 15
    },
    {
        name: 'Avenue Mozart',
        type: Type.PROPERTY,
        position: 16,
        color: 'orange',
        rent: [14, 70, 200, 550, 700, 900],
        price: 180
    },
    {
        name: 'Caisse de Communauté',
        type: Type.COMMUNITY_CHEST,
        position: 17
    },
    {
        name: 'Boulevard Saint-Michel',
        type: Type.PROPERTY,
        position: 18,
        color: 'orange',
        rent: [14, 70, 200, 550, 700, 900],
        price: 180
    },
    {
        name: 'Place Pigalle',
        type: Type.PROPERTY,
        position: 19,
        color: 'orange',
        rent: [16, 80, 220, 600, 800, 1000],
        price: 200
    },
    {
        name: 'Parc Gratuit',
        type: Type.SPECIAL,
        position: 20
    },
    {
        name: 'Avenue Matignon',
        type: Type.PROPERTY,
        position: 21,
        color: 'red',
        rent: [18, 90, 250, 700, 875, 1050],
        price: 220
    },
    {
        name: 'Change',
        type: Type.CHANCE,
        position: 22
    },
    {
        name: 'Boulevard Malesherbes',
        type: Type.PROPERTY,
        position: 23,
        color: 'red',
        rent: [18, 90, 250, 700, 875, 1050],
        price: 220
    },
    {
        name: 'Avenue Henri-Martin',
        type: Type.PROPERTY,
        position: 24,
        color: 'red',
        rent: [20, 100, 300, 750, 925, 1100],
        price: 240
    },
    {
        name: 'Gare du Nord',
        type: Type.STATION,
        position: 25
    },
    {
        name: 'Faubourg Saint-Honoré',
        type: Type.PROPERTY,
        position: 26,
        color: 'yellow',
        rent: [22, 110, 330, 800, 975, 1150],
        price: 260
    },
    {
        name: 'Place de la Bourse',
        type: Type.PROPERTY,
        position: 27,
        color: 'yellow',
        rent: [22, 110, 330, 800, 975, 1150],
        price: 260
    },
    {
        name: 'Compagnie de Distribution des Eaux',
        type: Type.UTILITY,
        position: 28,
        price: 150
    },
    {
        name: 'Rue la Fayette',
        type: Type.PROPERTY,
        position: 29,
        color: 'yellow',
        rent: [24, 120, 360, 850, 1025, 1200],
        price: 280
    },
    {
        name: 'Allez en Prison',
        type: Type.SPECIAL,
        position: 30
    },
    {
        name: 'Avenue de Breteuil',
        type: Type.PROPERTY,
        position: 31,
        color: 'green',
        rent: [26, 130, 390, 900, 1100, 1275],
        price: 300
    },
    {
        name: 'Avenue Foch',
        type: Type.PROPERTY,
        position: 32,
        color: 'green',
        rent: [26, 130, 390, 900, 1100, 1275],
        price: 300
    },
    {
        name: 'Caisse de Communauté',
        type: Type.COMMUNITY_CHEST,
        position: 33
    },
    {
        name: 'Boulevard des Capucines',
        type: Type.PROPERTY,
        position: 34,
        color: 'green',
        rent: [28, 150, 450, 1000, 1200, 1400],
        price: 320
    },
    {
        name: 'Gare Saint-Lazare',
        type: Type.STATION,
        position: 35
    },
    {
        name: 'Chance',
        type: Type.CHANCE,
        position: 36
    },
    {
        name: 'Avenue des Champs-Elysées',
        type: Type.PROPERTY,
        position: 37,
        color: 'dark-blue',
        rent: [35, 175, 500, 1100, 1300, 1500],
        price: 350
    },
    {
        name: 'Taxe de Luxe',
        type: Type.SPECIAL,
        position: 38
    },
    {
        name: 'Rue de la Paix',
        type: Type.PROPERTY,
        position: 39,
        color: 'dark-blue',
        rent: [50, 200, 600, 1400, 1700, 2000],
        price: 400
    }
]

export default Board;

export interface Cell {
    name: string;
    type: Type;
    position: number;
    color?: string;
    rent?: number[];
    price?: number;
}
