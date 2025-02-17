// City-related types and interfaces
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

export type TCitySearchRefs = {
  dropdownRef: React.RefObject<HTMLDivElement>;
};
