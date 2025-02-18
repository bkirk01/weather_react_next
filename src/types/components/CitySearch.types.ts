export interface ICity {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
}

export interface ICitySearchState {
  query: string;
  cities: ICity[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  shouldSearch: boolean;
}

export interface ICitySearchRefs {
  dropdownRef: React.RefObject<HTMLDivElement>;
}
