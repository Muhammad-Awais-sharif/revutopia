import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CountryDropdownProps } from './country-dropdown.types';
import { countries } from './countries.data';

export function CountryDropdown({ selected, onSelect }: CountryDropdownProps) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          src={`https://flagcdn.com/w20/${selected?.id}.png`}
          alt={selected?.name}
          className="w-7 h-4"
        />
        <span>{selected.name}</span>
        <ChevronDown className="ml-auto w-5 h-5 text-[#7C8BA0]" />
      </div>
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          <input
            type="text"
            className="w-full p-2 border-b"
            placeholder="Search country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.map((country) => (
            <div
              key={country.id}
              className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(country);
                setOpen(false);
                setSearch('');
              }}
            >
              <img
                src={`https://flagcdn.com/w20/${country.id}.png`}
                alt={country.name}
                className="w-7 h-4"
              />
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
