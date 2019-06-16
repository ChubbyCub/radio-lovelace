import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

class Playlist extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      tracks: props.tracks,
      side: props.side,
    };
  }

  calculatePlayTime = (tracks) => {
    let minutes = 0;
    let seconds = 0;
    tracks.forEach((track) => {
      const times = track.playtime.split(':');
      minutes += parseInt(times[0]);
      seconds += parseInt(times[1]);
    });
  
    minutes += Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    seconds = ("" + seconds).padStart(2, "0");
    minutes = ("" + minutes).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }

  moveToTop = (id) => {
    const tempList = this.state.tracks;
    const index = tempList.findIndex((element) => element.id === id);
    tempList.splice(0, 0, tempList.splice(index, 1)[0]); 
    this.setState({
      tracks: tempList,
    })
  }

  markFavorite = (id) => {
    const index = this.state.tracks.findIndex((element) => element.id === id);
    const temp = this.state.tracks[index];
    temp.favorite = true;
  }

  render() {
    const tracks = this.state.tracks;
    const trackCount = tracks.length;
    const playtime = this.calculatePlayTime(tracks);
    const trackElements = tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          key={track.id}
          trackId={track.id}
          favoriteCallBack={this.markFavorite}
          chosenTop={this.moveToTop}
          {...track}
        />
      );
    });

    return (
      <div className="playlist">
        <h2>{this.state.side} Playlist</h2>
        <p>
          {trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          {trackElements}
        </ul>
      </div>
    );
  }
}


Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
