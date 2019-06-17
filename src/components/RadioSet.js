import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends React.Component { 

  constructor (props) {
    console.log(`Radio set for ${props.tracks.length} tracks`);
    super(props)

    const playlists = {
      morningTracks: props.tracks.slice(0, props.tracks.length / 2),
      eveningTracks: props.tracks.slice(props.tracks.length / 2, props.tracks.length)
    };

    this.state = {
      morningTracks: playlists.morningTracks,
      eveningTracks: playlists.eveningTracks,
    }
  }

  updateList = (id, side) => {
    const amList = this.state.morningTracks;
    const pmList = this.state.eveningTracks;
    
    if(side === 'Morning') {
      const index = amList.findIndex((element) => element.id === id);
      const targetSong = amList[index];
      amList.splice(index, 1);
      pmList.unshift(targetSong);
      
      this.setState({
        morningTracks: amList,
        eveningTracks: pmList,
      });
    } 
    
    if(side === 'Evening') {
      const index = pmList.findIndex((element) => element.id === id);
      const targetSong = pmList[index];
      pmList.splice(index, 1);
      amList.unshift(targetSong);

      this.setState({
        morningTracks: amList,
        eveningTrakcs: pmList,
      });
    }
  }

  render() {
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.morningTracks}
            moveListCallBack={this.updateList}
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            moveListCallBack={this.updateList}
          />
        </section>
      </div>
    );
  }
};

export default RadioSet;