import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');


const exampleDisplayData = {
    name: "Test Show",
    summary: "Test summary.",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        }
    ],

  };


test('renders without errors with no props', async () => {
    render(<Display />);
 });


test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleDisplayData);

    render(<Display/>);
    //grab button. can getByRole bc only 1 button there
    const button = screen.getByRole('button');
    userEvent.click(button);

    //we're doing an api call. grab show-container to see if it's rendered
    const show = await screen.findByTestId('show-container');
        // console.log('show:', show);
    expect(show).toBeInTheDocument();
});


test('renders season options matching fetch return when button is clicked', async () => {
    //copied from above
    mockFetchShow.mockResolvedValueOnce(exampleDisplayData);

    render(<Display/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    //new. find seasons
    await waitFor(()=> {
        const seasonOptions = screen.queryAllByTestId('season-option');
        // console.log('seasonOptions:', seasonOptions);
        const exp = expect(seasonOptions);

        exp.toHaveLength(2);
    })

 });



test('renders show season options matching your data when the button is clicked', async () => { 
    //copied from above. looking for function to be called now tho
    mockFetchShow.mockResolvedValueOnce(exampleDisplayData);
    const displayfunc = jest.fn();

    render(<Display displayFunc={displayfunc}/>);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    //new stuff for function to be called now
    await waitFor(()=>{
        expect(displayfunc).toHaveBeenCalled();
    });
});