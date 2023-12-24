// MultiSelectInput.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import MultiSelectInput, { FormProps } from '../components/multiselect';
import 'tailwindcss/tailwind.css';

export default {
  title: 'MultiSelectInput',
  component: MultiSelectInput,
  decorators: [
    (Story) => (
      <div className="p-6 mx-auto bg-white rounded-xl shadow-md w-1/4">
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<FormProps> = (args) => <MultiSelectInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    [
      { value: 'pikachu', label: 'Pikachu' },
      { value: 'bulbasaur', label: 'Bulbasaur' },
      { value: 'charmander', label: 'Charmander' },
      { value: 'squirtle', label: 'Squirtle' },
      { value: 'jigglypuff', label: 'Jigglypuff' },
    ],
    [
      { value: 'eevee', label: 'Eevee' },
      { value: 'snorlax', label: 'Snorlax' },
    ],
  ],
  addPokemon: () => {},
  deletePokemon: () => {},
  choosedPokemons: [],
  choosedPokemonsError: '',
};
