import React from 'react';
import Episode from './Episode';

export default function Episodes(props) {
  return (
    <div data-testid="episodes-container" className="episodes">
      {props.episodes.map(episode => 
        <Episode episode={episode} />
      )}
    </div>
  );
}

// corrected it to {props.episodes && props.episodes.map(episode => bc there was a bug before. Issue was that my property in my test object was named 'episode' -- needed to be 'episodes'