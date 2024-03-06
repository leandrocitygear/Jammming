import React, { useState, useCallback } from 'react';
import './App.css';

import SearchBar from "../Searchbar/Search"
import SearchResults from '../Searchresults/Results';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const App = () => {
const [searchResults, setSearchResults] = useState([]);
const [playlistName, setPlaylistName] = useState('New Playlist');
const [playlistTracks, setPlaylistTracks] = useState([]);

const search = useCallback((term) => {
  Spotify.search(term).then(setSearchResults)
}, []);

const addTracksToPlaylist = useCallback((track) => {
  if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) 
  return;

setPlaylistTracks((prevTracks) => [...prevTracks, track]);

}, [playlistTracks]);

const removeTracksFromPlaylist = useCallback((track) => {
  setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
}, []);

const updatedPlaylistName = useCallback((name) => {
  setPlaylistName(name);
}, []);

const savePlaylist = useCallback(() => {
  const trackUris = playlistTracks.map((track) => track.uri);
  Spotify.savePlaylist(playlistName, trackUris).then(() => {
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  });

}, [playlistName, playlistTracks]);

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={search}/>
      <div className='App-playlist'>
        <SearchResults searchResults={searchResults} onAdd={addTracksToPlaylist}/>
        <Playlist 
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onRemove={removeTracksFromPlaylist}
        onNameChange={updatedPlaylistName}
        onSave={savePlaylist}
        />
      
      </div>
    </div>
  );
};

export default App;
