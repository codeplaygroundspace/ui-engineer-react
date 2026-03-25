import React from 'react'
import { Item } from '../data/mockItems'

type Props = { item: Item }

export default function GridCard({ item }: Props) {
  return (
    <article className="rounded-lg overflow-hidden bg-white shadow-md group h-full relative">
      <div className="relative w-full" style={{ paddingTop: '66.666%' }}>
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-60 text-white px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {item.title}
        </div>
      </div>
    </article>
  )
}
