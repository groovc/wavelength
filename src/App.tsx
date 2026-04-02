import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Wavelength — Home (not yet implemented)</div>} />
      <Route path="/podcasts/:id" element={<div>Podcast Detail (not yet implemented)</div>} />
      <Route path="/search" element={<div>Search (not yet implemented)</div>} />
    </Routes>
  )
}
