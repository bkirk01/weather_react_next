export interface City {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export interface CitySearchState {
  query: string;
  cities: City[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  shouldSearch: boolean;
}

export interface CitySearchRefs {
  dropdownRef: React.RefObject<HTMLDivElement>;
}
