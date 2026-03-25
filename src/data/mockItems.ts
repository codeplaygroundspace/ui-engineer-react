export type Item = {
  id: string
  title: string
  image: string
  year?: number
  tags?: string[]
}

// Placeholder digital works (use real data later)
export const mockItems: Item[] = [
  {
    id: 'd1',
    title: 'Digital Studio A',
    image: 'https://picsum.photos/seed/d1/1200/800',
    year: 2024,
    tags: ['digital', 'design'],
  },
  {
    id: 'd2',
    title: 'Digital Studio B',
    image: 'https://picsum.photos/seed/d2/1200/800',
    year: 2023,
    tags: ['digital'],
  },
  {
    id: 'd3',
    title: 'Digital Studio C',
    image: 'https://picsum.photos/seed/d3/1200/800',
    year: 2022,
    tags: ['digital', 'design'],
  },
  {
    id: 'd4',
    title: 'Digital Studio D',
    image: 'https://picsum.photos/seed/d4/1200/800',
    year: 2025,
    tags: ['digital'],
  },
  {
    id: 'd5',
    title: 'Digital Studio E',
    image: 'https://picsum.photos/seed/d5/1200/800',
    year: 2021,
    tags: ['digital'],
  },
  {
    id: 'd6',
    title: 'Digital Studio F',
    image: 'https://picsum.photos/seed/d6/1200/800',
    year: 2020,
    tags: ['digital'],
  },
]
