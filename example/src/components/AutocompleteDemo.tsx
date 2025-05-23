import * as React from 'react';
import { Autocomplete } from '@capgeminiuk/dcx-react-library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

const firstSearch = [
  'Papaya',
  'Persimmon',
  'Paw Paw',
  'Prickly Pear',
  'Peach',
  'Pomegranate',
  'Pineapple',
];
const secondSearch = ['Persimmon', 'Peach'];
const thirdSearch = ['Persimmon'];

export const AutocompleteDemo = () => {
  const [selected, setSelected] = React.useState('');
  const handleSelected = (value: string) => setSelected(value);

  const [serverOptions, setServerOptions] = React.useState<String[]>([]);

  const handleOnChange = (value: string) => {
    switch (value) {
      case 'p':
        setServerOptions(firstSearch);
        break;
      case 'pe':
        setServerOptions(secondSearch);
        break;
      case 'per':
        setServerOptions(thirdSearch);
        break;
      default:
        setServerOptions(['no results']);
    }
  };

  return (
    <>
      <Autocomplete
        options={[
          'Papaya',
          'Persimmon',
          'Paw Paw',
          'Prickly Pear',
          'Peach',
          'Pomegranate',
          'Pineapple',
        ]}
        suffix={{
          content: <FontAwesomeIcon icon={faAt} title="at-button" />,
          properties: {},
        }}
        prefix={{
          content: <FontAwesomeIcon icon={faAt} title="at-button" />,
          properties: {},
        }}
        defaultValue="Papaya"
        minCharsBeforeSearch={1}
        debounceMs={2000}
        onSelected={handleSelected}
        hintText="search the list of fruits"
      />
      selected: {selected}
      <h2>Server fetch</h2>
      <Autocomplete
        //@ts-ignore
        options={serverOptions}
        minCharsBeforeSearch={1}
        debounceMs={1000}
        onSelected={handleSelected}
        hintText="search the list of fruits dynamically"
        onChange={handleOnChange}
        notFoundText=" "
      />
      selected: {selected}
      <h2>With conditional prompt</h2>
      <Autocomplete
        options={[
          'Papaya',
          'Persimmon',
          'Paw Paw',
          'Prickly Pear',
          'Peach',
          'Pomegranate',
          'Pineapple',
        ]}
        defaultValue=""
        minCharsBeforeSearch={1}
        promptCondition={() => true}
        promptMessage="Enter a valid date before typing here"
        debounceMs={100}
        hintText="click inside the input to see the prompt"
        hintClass="hintClass"
        resultUlClass="resultUlClass"
        resultlLiClass="resultlLiClass"
        resultNoOptionClass="resultNoOptionClass"
        resultActiveClass="resultActiveClass"
        notFoundText="No fruit found"
      />
      <h2>With min-chars prompt</h2>
      <Autocomplete
        options={[
          'Papaya',
          'Persimmon',
          'Paw Paw',
          'Prickly Pear',
          'Peach',
          'Pomegranate',
          'Pineapple',
        ]}
        defaultValue=""
        minCharsBeforeSearch={1}
        minCharsMessage="Type at least 1 character to see the available options"
        debounceMs={100}
        hintText="click inside the input to see the prompt"
        hintClass="hintClass"
        resultUlClass="resultUlClass"
        resultlLiClass="resultlLiClass"
        resultNoOptionClass="resultNoOptionClass"
        resultActiveClass="resultActiveClass"
        notFoundText="No fruit found"
      />
    </>
  );
};
