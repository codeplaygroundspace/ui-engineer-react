import React from 'react'
import MinimalLayout from '../layouts/MinimalLayout'
import GridCard from '../components/GridCard'
import { mockItems } from '../data/mockItems'

export default function Home() {
  const items = mockItems
  return (
    <MinimalLayout>
      <main className="p-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <GridCard key={it.id} item={it} />
          ))}
        </section>
      </main>
    </MinimalLayout>
  )
}
