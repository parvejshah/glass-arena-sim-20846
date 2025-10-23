import type { Gallery } from '@/types/seatBooking';

export const galleryData: Gallery[] = [
  {
    id: 'eastern',
    name: 'Eastern Gallery',
    blocks: ['I, J, K, L, M, N'],
    levels: ['Default'],
    price: 260.87,
    svgPathIds: {
      Default: ['easternGallery_ijklmn_1', 'easternGallery_ijklmn_2']
    },
  },
  {
    id: 'northern',
    name: 'Northern Gallery',
    blocks: ['O, P, Q'],
    levels: ['Default'],
    price: 347.83,
    svgPathIds: {
      Default: ['northernGallery_opq_1', 'northernGallery_opq_2']
    },
  },
  {
    id: 'shaheedAbuSayed',
    name: 'Shaheed Abu Sayed Stand',
    blocks: ['F, G, H'],
    levels: ['Default'],
    price: 347.83,
    svgPathIds: {
      Default: ['shaheedAbuSayedStand_fgh_1', 'shaheedAbuSayedStand_fgh_2']
    },
  },
  {
    id: 'clubHouseNorth',
    name: 'Club House (N) (Shaheed Jewel Stand)',
    blocks: ['T, U, V'],
    levels: ['Default'],
    price: 695.65,
    svgPathIds: {
      Default: ['clubHouseNorthSaheedJewelStand_tuv_1', 'clubHouseNorthSaheedJewelStand_tuv_2']
    },
  },
  {
    id: 'clubHouseSouth',
    name: 'Club House (S) (Shaheed Mushtaq Stand)',
    blocks: ['A, B, C'],
    levels: ['Default'],
    price: 695.65,
    svgPathIds: {
      Default: ['clubhousesouthSaheedMushtaqStand_abc_1', 'clubhousesouthSaheedMushtaqStand_abc_2']
    },
  },
  {
    id: 'grandStand',
    name: 'Grand Stand',
    blocks: ['Pavilion Building'],
    levels: ['Upper', 'Lower'],
    price: 2173.91,
    svgPathIds: {
      Upper: [
        'grandStand_pavillionBuilding_upper_1',
        'grandStand_pavillionBuilding_upper_2',
        'grandStand_pavillionBuilding_upper_3',
        'grandStand_pavillionBuilding_upper_4',
        'grandStand_pavillionBuilding_upper_5',
        'grandStand_pavillionBuilding_upper_6',
      ],
      Lower: [
        'grandStand_pavillionBuilding_lower_1',
        'grandStand_pavillionBuilding_lower_2',
        'grandStand_pavillionBuilding_lower_3',
      ],
    },
  },
  {
    id: 'internationalLoungeSouth',
    name: 'International Lounge (S) (Corporate Block)',
    blocks: ['South Side 3rd Floor'],
    levels: ['Upper'],
    price: 3043.48,
    svgPathIds: {
      Upper: ['internationalLoungeSouthCorporateBlock_southSide3rdFloor_upper']
    },
  },
  {
    id: 'internationalGalleryNorth',
    name: 'International Gallery (N) (Media Block)',
    blocks: ['R, S (In & Out)'],
    levels: ['Lower'],
    price: 1304.35,
    svgPathIds: {
      Lower: ['internationalGalleryNorth_rs_lower']
    },
  },
  {
    id: 'internationalGallerySouth',
    name: 'International Gallery (S) (Corporate Block)',
    blocks: ['D, E'],
    levels: ['Lower'],
    price: 1304.35,
    svgPathIds: {
      Lower: ['internationalGallerySouthCorporateBlock_de_lower']
    },
  },
];
