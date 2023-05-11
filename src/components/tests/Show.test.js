import React from 'react';
import { render, 
    // fireEvent, 
    screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';


const exampleShowData = {
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
  
test('renders testShow and no selected Season without errors', () => {
    render(<Show show={exampleShowData} selectedSeason={'none'} />);
    console.log("SHOW TEST EXAMPLE HERE", exampleShowData)
});


test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>);
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
 });


test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShowData} selectedSeason={'none'}/>);
    const season = screen.queryAllByTestId('season-option');
    expect(season).toHaveLength(2);
 });



test('handleSelect is called when an season is selected', async () => { 
    const handleSelect = jest.fn();
    
    render(<Show show={exampleShowData} selectedSeason={'none'} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);

    await userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();
});


test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    //render with no season
    const {rerender} = render(<Show show={exampleShowData} selectedSeason={'none'}/>);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    //rerender with a season
    rerender(<Show show={exampleShowData} selectedSeason={1}/>);
    //grab container
    let episodeTwo = screen.queryByTestId('episodes-container');
    expect(episodeTwo).toBeInTheDocument();
 });




// 1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//  2. Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
//  Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
//  3. Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
//  4. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
//  5. Test that the episodes component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
