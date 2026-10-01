/**
 * LUMEN — THE IMPOSSIBLE MUSEUM
 * Procedural Web Audio Soundscape
 * -------------------------------------------------------------------------
 * Generates an ethereal, contemplative museum drone using pure Web Audio API
 * oscillators and stereo panning. 100% self-contained and offline-ready.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let osc1 = null;
  let osc2 = null;
  let lfo = null;
  let panner = null;

  function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioCtx = new AudioContext();

    // Master Gain
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

    // Stereo Panner
    if (audioCtx.createStereoPanner) {
      panner = audioCtx.createStereoPanner();
      masterGain.connect(panner);
      panner.connect(audioCtx.destination);
    } else {
      masterGain.connect(audioCtx.destination);
    }

    // Sub-bass fundamental drone (55 Hz - A1)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Warm celestial harmonic (110 Hz - A2)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.2, audioCtx.currentTime);

    // Subtle LFO for breathing drone dynamics
    lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime);

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(8.0, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc2.frequency);

    const osc1Gain = audioCtx.createGain();
    osc1Gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    osc1.connect(osc1Gain);
    osc1Gain.connect(masterGain);

    const osc2Gain = audioCtx.createGain();
    osc2Gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);

    osc1.start();
    osc2.start();
    lfo.start();
  }

  function toggleAudio() {
    const btn = document.getElementById('audio-toggle-btn');
    const label = document.getElementById('audio-status-text');

    if (!audioCtx) {
      initAudio();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isPlaying) {
      // Fade In
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 2.5);
      isPlaying = true;
      if (btn) btn.classList.add('playing');
      if (label) label.textContent = 'MUTE AMBIENCE';
    } else {
      // Fade Out
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      isPlaying = false;
      if (btn) btn.classList.remove('playing');
      if (label) label.textContent = 'SOUND: VOID';
    }
  }

  // Interactive Stereo Panning based on Mouse X
  window.addEventListener('mousemove', (e) => {
    if (panner && isPlaying && audioCtx) {
      const pan = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      panner.pan.setValueAtTime(pan * 0.45, audioCtx.currentTime);
    }
  });

  // Attach button listener
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('audio-toggle-btn');
    if (btn) {
      btn.addEventListener('click', toggleAudio);
    }
  });
})();
