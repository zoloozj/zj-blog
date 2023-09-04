import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <h2>Олдсонгүй</h2>
        <p>Таны хайсан хуудас олдсонгүй</p>
       Энд дараад <Link href="/" className='underline'>Нүүр хуудас</Link> руу шилжинэ үү
    </div>
  )
}

export default NotFound