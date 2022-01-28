import Image from 'next/image';
import { Props } from '../../type';

export const Characters: React.FC<Props> = ({ characters }) => {
  console.log(characters);

  return (
    <div className='text-center'>
      <div className='grid-col-1 grid md:grid-cols-3 lg:grid-cols-3'>
        {characters.map((character: any) => {
          return (
            <div
              key={character.id}
              className='h-88 w-88 relative mb-8 mt-2 grid items-center justify-center space-x-9 border bg-gray-50 shadow-md md:mt-10 md:w-80 lg:mt-10 lg:mb-8 lg:w-96 xl:mx-10'
            >
              <div
                className='
                mt-6 cursor-pointer
                transition-transform duration-300 ease-in-out hover:scale-105'
              >
                <Image src={character.image} width={320} height={320} />
              </div>
              <span className='mb-2 p-2'>Name: {character.name}</span>
              <span className='mb-2 p-2'>Location: {character.location.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
