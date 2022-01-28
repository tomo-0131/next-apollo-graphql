/* This example requires Tailwind CSS v2.0+ */

import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

export const Header = () => {
  return (
    <div className='mx-auto mb-2 max-w-7xl items-center justify-center border-b shadow-md'>
      <div className='mx-auto max-w-7xl'>
        <div className='relative bg-white pb-2'>
          <div className='relative px-6 pt-6 sm:px-6 md:space-x-8 lg:px-8'>
            <nav
              className='flex items-center justify-between p-2 sm:h-10 lg:justify-start'
              aria-label='Global'
            >
              <div className='flex flex-shrink-0 flex-grow  items-center lg:flex-grow-0'>
                <div className='w-full items-center justify-between md:w-auto'>
                  <span className='-mt-4 flex text-2xl'>
                    <Link href='/'>NextGraphApp</Link>
                  </span>
                </div>
              </div>
              <div className='-mt-2 space-x-4 md:ml-10 md:block md:space-x-8 md:pr-4 lg:ml-10 lg:space-x-8 lg:pr-4'>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
