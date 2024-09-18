import { FaCar, FaHotel, FaUmbrellaBeach } from 'react-icons/fa'

const extras = [
  {
    id: 1,
    title: "Car Rentals",
    image: "/rentals.webp",
    icon: <FaCar className='size-6' />
  },
  {
    id: 2,
    title: "Hotels",
    image: "/rentals.webp",
    icon: <FaHotel className='size-6' />
  },
  {
    id: 3,
    title: "Travel Packages",
    image: "/rentals.webp",
    icon: <FaUmbrellaBeach className='size-6' />
  },
];

export default function Extras() {
  return (
    <ul className="flex lg:flex-col overflow-x-auto gap-4">
      {extras.map((extra) => (
        <li
          key={extra.id}
          className="grid relative items-end *:col-start-1 *:row-start-1 size-40 lg:size-80 text-white rounded-lg overflow-hidden bg-cover"
          style={{ backgroundImage: `url(${extra.image})` }}
        >
          <div className='p-4 z-10'>
            {extra.icon}
            <p className="lg:text-3xl font-semibold">{extra.title}</p>
          </div>

          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent h-full' />
        </li>
      ))}
    </ul>
  );
}
