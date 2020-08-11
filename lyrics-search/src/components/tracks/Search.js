import React, { Component } from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

 class Search extends Component {

    state = {
        trackTitle: ''
    }
    findTrack = (dispatch, e) => {

        e.preventDefault();
        axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=f914ec3227b0b2fc3ccadd896cbf5716`)
         .then(
             res => {
                 dispatch({
                     type: 'SEARCH_TRACKS',
                     payload : res.data.message.body.track_list
                 });
        
                }
             
         )
         .catch(err => console.log(err));
    }

    onChange(e){
        this.setState({trackTitle: e.target.value})
    }

    render() {
        return (
          <Consumer>
              {value => {
                  const { dispatch} = value;
                  return (
                      <div className="card card-body mb-4 p-4">
                          <h1 className="display-4 text-center">
                          <i className="fas fa-music"></i> Search For a Song
                          </h1>
                          <p className="lead text-center">Get the Lyrics for any song</p>   
                          <form onSubmit={this.findTrack.bind(this, dispatch)}>
                              <div className="form-group">
                                  <input className="form-control form-control-lg" 
                                  type="text" placeholder="Song title..."
                                  name="trackTitle" value={this.state.trackTitle}
                                  onChange={this.onChange.bind(this)}/>
                              </div>
                              <button className="btn btn-primary btn-lg
                               btn-block mb-5" type="submit">
                                  Get Track Lyrics
                              </button>
                          </form>
                      </div>
                  )
              }}
          </Consumer>
        )
    }
}

export default Search;
