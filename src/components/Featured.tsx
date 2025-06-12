import Image from "next/image";

export default function FeaturedBooks() {
  const books = [
    { id: 1, title: 'Dragon Chronicles', image: '/images/manga1.jpg', rating: 4.8 },
    { id: 2, title: 'Moonlight Saga', image: '/images/manga2.jpg', rating: 4.5 },
    { id: 3, title: 'Shadow Realm', image: '/images/manga3.jpg', rating: 4.9 },
  ];

  return (
    <section className="p-6">
      <h3 className="text-2xl font-bold mb-4">Popular Manga</h3>
      <div className="flex gap-4 overflow-x-auto">
        {books.map(book => (
          <div key={book.id} className="min-w-[200px] bg-white rounded shadow p-2">
            <Image src={book.image} alt={book.title} className="h-48 w-full object-cover rounded" width={980} height={1080}/>
            <h4 className="text-lg font-semibold mt-2">{book.title}</h4>
            <p className="text-yellow-500">⭐ {book.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
