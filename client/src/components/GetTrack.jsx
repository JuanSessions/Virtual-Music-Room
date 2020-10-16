import React, { useState, useContext, useEffect } from 'react'

export default function GetTrack() {
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        fetch("/track")
            .then(res => res.json())
            .then(data => {
                setTracks(data.tracks)
            })
    }, [])

    if (!tracks) {
        return "loading"
    }

    return (
        <div>
            <h2>Get Track</h2>
            {tracks.trackName}
        </div>
    )
}
