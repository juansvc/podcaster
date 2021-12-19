import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './containers/Header'
import MainSection from './containers/MainSection'
import FooterPlayer from './components/FooterPlayer'

import { useDispatch, useSelector } from 'react-redux'
import { play, pause } from './redux/actions/playEpisodeActions'

import './App.css';

function App() {
  const [audio, setAudio] = useState({})
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.currentTrack)
  const { isPlaying, episode: { episodeUrl, collectionName } } = currentTrack

  document.title = collectionName && isPlaying ? collectionName : 'Podcast Player'

  const handlePlay = (episode) => (e) => {  
    let sound
    if (!episodeUrl) {
      sound = new Audio(episode.episodeUrl)
      sound.play()
      setAudio(sound)
      dispatch(play(episode))
    } else if (episodeUrl !== episode.episodeUrl) {
      audio.pause()
      sound = new Audio(episode.episodeUrl)
      sound.play()
      setAudio(sound)
      dispatch(play(episode))
    } else {
      audio.play()
      dispatch(play(episode))
    }
  }

  const handlePause = () => {
    audio.pause()
    dispatch(pause())
  }

  return (
    <div className='App'>
      <BrowserRouter>
      <div>
        <Header />
        <div className='flex relative'>
          <MainSection handlePause={handlePause} handlePlay={handlePlay}  />
          <FooterPlayer handlePause={handlePause} handlePlay={handlePlay} />
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;