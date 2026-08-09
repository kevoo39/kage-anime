'use client';

import { useEffect, useState } from 'react';

export default function VideoStudio() {
  const [prompt, setPrompt] = useState('Cinematic 1940s wartime London, a secret intelligence officer walks through a dimly lit office carrying a classified dossier, rain on the windows, realistic period detail, restrained camera movement, dramatic film lighting.');
  const [model, setModel] = useState('ray-2');
  const [resolution, setResolution] = useState('720p');
  const [duration, setDuration] = useState('5s');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [startImageUrl, setStartImageUrl] = useState('');
  const [endImageUrl, setEndImageUrl] = useState('');
  const [generationId, setGenerationId] = useState('');
  const [state, setState] = useState('idle');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!generationId || state === 'completed' || state === 'failed') return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/video/${generationId}`, { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Status request failed');
        setState(data.state || 'dreaming');
        if (data.state === 'completed' && data.assets?.video) {
          setVideoUrl(data.assets.video);
          window.clearInterval(timer);
        }
        if (data.state === 'failed') {
          setError(data.failure_reason || 'Video generation failed.');
          window.clearInterval(timer);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unable to check generation status.');
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [generationId, state]);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setVideoUrl('');
    setGenerationId('');
    setState('starting');
    try {
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt, model, resolution, duration, aspectRatio, startImageUrl, endImageUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to start generation.');
      setGenerationId(data.id);
      setState(data.state || 'dreaming');
    } catch (e) {
      setState('failed');
      setError(e instanceof Error ? e.message : 'Unable to start generation.');
    }
  }

  return (
    <section className="section videoStudio" id="ai-studio">
      <div className="sectionHead">
        <div><h2>AI Video Studio</h2><span className="muted">Luma Dream Machine · server-side API</span></div>
        <span className={`studioStatus ${state}`}>{state === 'idle' ? 'Ready' : state}</span>
      </div>
      <form className="studioForm" onSubmit={generate}>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe your shot…" rows={5} />
        <div className="studioControls">
          <label>Model<select value={model} onChange={e => setModel(e.target.value)}><option value="ray-2">Ray 2</option><option value="ray-flash-2">Ray 2 Flash</option></select></label>
          <label>Resolution<select value={resolution} onChange={e => setResolution(e.target.value)}><option>540p</option><option>720p</option><option>1080</option><option>4k</option></select></label>
          <label>Duration<select value={duration} onChange={e => setDuration(e.target.value)}><option>5s</option><option>9s</option></select></label>
          <label>Aspect<select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}><option>16:9</option><option>9:16</option><option>1:1</option><option>21:9</option><option>4:3</option></select></label>
        </div>
        <div className="studioControls">
          <label className="wide">Start image URL<input value={startImageUrl} onChange={e => setStartImageUrl(e.target.value)} placeholder="Optional public HTTPS image URL" /></label>
          <label className="wide">End image URL<input value={endImageUrl} onChange={e => setEndImageUrl(e.target.value)} placeholder="Optional public HTTPS image URL" /></label>
        </div>
        <button className="primary studioGenerate" disabled={state === 'starting' || state === 'dreaming'}>{state === 'starting' || state === 'dreaming' ? 'Generating…' : 'Generate video'}</button>
      </form>
      {error && <div className="errorBox">{error}</div>}
      {videoUrl && <div className="studioResult"><video controls playsInline src={videoUrl} /><a className="secondary" href={videoUrl} target="_blank" rel="noreferrer">Open video</a></div>}
      {!videoUrl && (state === 'starting' || state === 'dreaming') && <div className="studioWaiting">Your request is running in the background. This panel checks the generation automatically every 5 seconds.</div>}
    </section>
  );
}
