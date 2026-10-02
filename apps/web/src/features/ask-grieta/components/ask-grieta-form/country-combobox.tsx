'use client';

import { Combobox, useListCollection } from '@ark-ui/react/combobox';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment, type FunctionComponent, useId, useRef } from 'react';

import {
  COUNTRIES,
  type Country,
  PINNED_COUNT,
  filterCountries,
  findCountry,
} from '../../constants/countries';
import { trackAskGrieta } from '../../utils/track';
import {
  countryControlStyle,
  countryDividerStyle,
  countryEmptyStyle,
  countryInputStyle,
  countryItemDialStyle,
  countryItemNameStyle,
  countryItemStyle,
  countryListStyle,
  countryPositionerStyle,
  countryTriggerStyle,
} from './styles.css';

type CountryComboboxProps = {
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
};

const displayValue = (country: Country): string => `${country.flag} +${country.dial}`;

/**
 * Country dial code picker (Ark UI Combobox): every country libphonenumber
 * knows, Latvia, Lithuania and Estonia pinned on top. Type a Latvian or
 * English name, an ISO code or a dial code ("Vāc", "germ", "DE", "+49").
 * Shows "🇱🇻 +371" when closed, so it fits next to the number.
 */
export const CountryCombobox: FunctionComponent<CountryComboboxProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const labelId = useId();
  // Whether the visitor searched before choosing, for `ask-country-select`.
  const searchedRef = useRef(false);
  const country = findCountry(value);
  const { collection, set } = useListCollection<Country>({
    initialItems: COUNTRIES,
    itemToString: displayValue,
    itemToValue: (item) => item.code,
  });
  const unfiltered = collection.items.length === COUNTRIES.length;

  return (
    <Combobox.Root
      collection={collection}
      value={[country.code]}
      defaultInputValue={displayValue(country)}
      onValueChange={({ value: next }) => {
        // Never leave the picker empty: clearing the text keeps the last country.
        if (next[0] && next[0] !== country.code) {
          trackAskGrieta('ask-country-select', {
            country: next[0],
            method: searchedRef.current ? 'typed' : 'picked',
          });
          onChange(next[0]);
        }
      }}
      onInputValueChange={({ inputValue, reason }) => {
        if (reason === 'input-change') {
          searchedRef.current = inputValue.trim().length > 0;
          set(filterCountries(inputValue));
        }
      }}
      onOpenChange={({ open }) => {
        if (!open) {
          set(COUNTRIES);
          // A click on an option closes the list before reporting the value;
          // keep the "searched" flag until that value change has been read.
          setTimeout(() => {
            searchedRef.current = false;
          }, 0);
        }
      }}
      inputBehavior="autohighlight"
      selectionBehavior="replace"
      openOnClick
      disabled={disabled}
      positioning={{ placement: 'bottom-start', sameWidth: false, gutter: 6, fitViewport: true }}
    >
      {/* Own name: inside Field, Ark would label it with the number's label. */}
      <span id={labelId} hidden>
        Valsts kods: {country.name} +{country.dial}
      </span>
      <Combobox.Control className={countryControlStyle}>
        <Combobox.Input
          className={countryInputStyle}
          aria-labelledby={labelId}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          // Select the "🇱🇻 +371" text so typing replaces it with a search.
          onFocus={(event) => {
            const input = event.currentTarget;
            requestAnimationFrame(() => input.select());
          }}
        />
        <Combobox.Trigger className={countryTriggerStyle} aria-label="Rādīt visas valstis">
          <ChevronDown size={14} aria-hidden="true" />
        </Combobox.Trigger>
      </Combobox.Control>
      {/* No Portal: the list must stay inside the drawer's focus trap. */}
      <Combobox.Positioner className={countryPositionerStyle}>
        <Combobox.Content className={countryListStyle}>
          <Combobox.Empty className={countryEmptyStyle}>
            Neviena valsts neatbilst. Pamēģini ar valsts kodu, piemēram +49.
          </Combobox.Empty>
          {collection.items.map((item, index) => (
            <Fragment key={item.code}>
              {unfiltered && index === PINNED_COUNT && (
                <div className={countryDividerStyle} role="presentation" />
              )}
              <Combobox.Item item={item} className={countryItemStyle}>
                <Combobox.ItemText className={countryItemNameStyle}>
                  <span aria-hidden="true">{item.flag}</span> {item.name}
                </Combobox.ItemText>
                <span className={countryItemDialStyle}>+{item.dial}</span>
                <Combobox.ItemIndicator>
                  <Check size={14} aria-hidden="true" />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            </Fragment>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};
