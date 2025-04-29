interface Country {
  id: string;
  name: string;
}

export interface CountryDropdownProps {
  selected: Country;
  onSelect: (country: Country) => void;
}
