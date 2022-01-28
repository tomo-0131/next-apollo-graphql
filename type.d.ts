export interface Props {
  characters: [
    {
      id: number;
      name: string;
      image: string;
      location: {
        id: number;
        name: string;
      };
      origin: {
        id: number;
        name: string;
      };
      episode: {
        id: number;
        episode: string;
        air_date: string;
      };
    },
  ];
}
