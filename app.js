(() => {
  'use strict';

  const player = document.getElementById('player');
  const playerBar = document.getElementById('playerBar');
  const playPauseButton = document.getElementById('playPause');
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');
  const shuffleButton = document.getElementById('shuffleButton');
  const repeatButton = document.getElementById('repeatButton');
  const queueButton = document.getElementById('queueButton');
  const muteButton = document.getElementById('muteButton');
  const progressInput = document.getElementById('progressInput');
  const volumeInput = document.getElementById('volumeInput');
  const currentTimeElement = document.getElementById('currentTime');
  const durationElement = document.getElementById('duration');
  const songTitle = document.getElementById('songTitle');
  const artistName = document.getElementById('artistName');
  const albumCover = document.getElementById('albumCover');
  const trackList = document.getElementById('trackList');
  const searchInput = document.getElementById('searchInput');
  const resultsCount = document.getElementById('resultsCount');
  const emptyState = document.getElementById('emptyState');
  const filterRow = document.getElementById('filterRow');
  const artistGrid = document.getElementById('artistGrid');
  const sidebarArtists = document.getElementById('sidebarArtists');
  const sidebarCount = document.getElementById('sidebarCount');
  const heroCover = document.getElementById('heroCover');
  const heroPlay = document.getElementById('heroPlay');
  const showAllArtists = document.getElementById('showAllArtists');
  const clearSearch = document.getElementById('clearSearch');

  const catalog = [...musicas].sort((first, second) => {
    const artistOrder = first.banda.localeCompare(second.banda, 'pt-BR', { sensitivity: 'base' });
    return artistOrder || first.titulo.localeCompare(second.titulo, 'pt-BR', { sensitivity: 'base' });
  });

  const artistMap = new Map();
  catalog.forEach((track) => {
    if (!artistMap.has(track.banda)) {
      artistMap.set(track.banda, {
        name: track.banda,
        cover: track.capa || '',
        tracks: []
      });
    }
    artistMap.get(track.banda).tracks.push(track);
  });

  const artists = [...artistMap.values()].sort((first, second) => {
    const countOrder = second.tracks.length - first.tracks.length;
    return countOrder || first.name.localeCompare(second.name, 'pt-BR', { sensitivity: 'base' });
  });

  const featuredTrack = catalog.find((track) => track.banda === 'AC/DC' && track.titulo === 'Back in Black') || catalog[0];

  let query = '';
  let selectedArtist = 'Todos';
  let filteredTracks = [...catalog];
  let currentTrack = null;
  let shuffleEnabled = false;
  let repeatEnabled = false;
  let previousVolume = 0.8;

  function normalizeText(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  function updateRangeFill(input, value) {
    const min = Number(input.min) || 0;
    const max = Number(input.max) || 100;
    const percent = max === min ? 0 : ((Number(value) - min) / (max - min)) * 100;
    input.style.setProperty('--range-value', `${Math.max(0, Math.min(100, percent))}%`);
  }

  function createImage(source, alt, className) {
    if (!source) return null;
    const image = document.createElement('img');
    image.src = source;
    image.alt = alt;
    image.className = className;
    image.loading = 'lazy';
    image.addEventListener('error', () => image.remove(), { once: true });
    return image;
  }

  function createFallback(label, className) {
    const fallback = document.createElement('span');
    fallback.className = className;
    fallback.textContent = label.trim().slice(0, 2).toUpperCase() || 'BT';
    return fallback;
  }

  function createMusicFallback(className) {
    const fallback = document.createElement('span');
    fallback.className = className;
    fallback.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>';
    return fallback;
  }

  function applyFilters() {
    const normalizedQuery = normalizeText(query);

    filteredTracks = catalog.filter((track) => {
      const matchesArtist = selectedArtist === 'Todos' || track.banda === selectedArtist;
      const searchableText = normalizeText(`${track.titulo} ${track.banda}`);
      return matchesArtist && searchableText.includes(normalizedQuery);
    });

    renderTrackList();
    updateActiveArtistStates();
  }

  function selectArtist(artist) {
    selectedArtist = selectedArtist === artist && artist !== 'Todos' ? 'Todos' : artist;
    applyFilters();
    document.getElementById('biblioteca').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateActiveArtistStates() {
    document.querySelectorAll('[data-artist]').forEach((element) => {
      const isActive = element.dataset.artist === selectedArtist;
      element.classList.toggle('active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderArtistGrid() {
    const fragment = document.createDocumentFragment();

    artists.forEach((artist) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'artist-card';
      card.dataset.artist = artist.name;
      card.setAttribute('aria-label', `Filtrar músicas de ${artist.name}`);

      const imageWrap = document.createElement('span');
      imageWrap.className = 'artist-card-image';
      const image = createImage(artist.cover, artist.name, '');
      if (image) imageWrap.appendChild(image);
      imageWrap.appendChild(createFallback(artist.name, 'sidebar-artist-fallback'));

      const playMark = document.createElement('span');
      playMark.className = 'artist-card-play';
      playMark.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>';
      imageWrap.appendChild(playMark);

      const name = document.createElement('strong');
      name.textContent = artist.name;
      const count = document.createElement('span');
      count.textContent = `${artist.tracks.length} ${artist.tracks.length === 1 ? 'faixa' : 'faixas'}`;

      card.append(imageWrap, name, count);
      card.addEventListener('click', () => selectArtist(artist.name));
      fragment.appendChild(card);
    });

    artistGrid.replaceChildren(fragment);
  }

  function renderSidebarArtists() {
    const fragment = document.createDocumentFragment();

    artists.forEach((artist) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sidebar-artist';
      button.dataset.artist = artist.name;

      const avatar = document.createElement('span');
      avatar.className = 'sidebar-avatar-wrap';
      const image = createImage(artist.cover, '', '');
      if (image) avatar.appendChild(image);
      avatar.appendChild(createFallback(artist.name, 'sidebar-artist-fallback'));
      button.appendChild(avatar);

      const copy = document.createElement('span');
      copy.className = 'sidebar-artist-copy';
      const name = document.createElement('strong');
      name.textContent = artist.name;
      const count = document.createElement('span');
      count.textContent = `${artist.tracks.length} ${artist.tracks.length === 1 ? 'música' : 'músicas'}`;
      copy.append(name, count);
      button.appendChild(copy);

      button.addEventListener('click', () => selectArtist(artist.name));
      fragment.appendChild(button);
    });

    sidebarArtists.replaceChildren(fragment);
    sidebarCount.textContent = `${catalog.length} faixas`;
  }

  function renderFilters() {
    const fragment = document.createDocumentFragment();
    const filterArtists = ['Todos', ...artists.map((artist) => artist.name)];

    filterArtists.forEach((artist) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip';
      chip.dataset.artist = artist;
      chip.textContent = artist;
      chip.addEventListener('click', () => selectArtist(artist));
      fragment.appendChild(chip);
    });

    filterRow.replaceChildren(fragment);
  }

  function renderTrackList() {
    const fragment = document.createDocumentFragment();

    filteredTracks.forEach((track, index) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'track-row';
      row.dataset.trackSrc = track.src;
      row.setAttribute('role', 'row');
      row.setAttribute('aria-label', `Tocar ${track.titulo}, ${track.banda}`);

      const indexCell = document.createElement('span');
      indexCell.className = 'track-index';
      indexCell.setAttribute('role', 'cell');
      const number = document.createElement('span');
      number.className = 'track-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const play = document.createElement('span');
      play.className = 'track-play';
      play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>';
      indexCell.append(number, play);

      const main = document.createElement('span');
      main.className = 'track-main';
      main.setAttribute('role', 'cell');
      const cover = document.createElement('span');
      cover.className = 'track-cover-wrap';
      const image = createImage(track.capa, '', 'track-cover');
      if (image) cover.appendChild(image);
      cover.appendChild(createMusicFallback('track-cover-fallback'));
      main.appendChild(cover);
      const copy = document.createElement('span');
      copy.className = 'track-copy';
      const title = document.createElement('strong');
      title.textContent = track.titulo;
      const subtitle = document.createElement('span');
      subtitle.textContent = 'Backing track';
      copy.append(title, subtitle);
      main.appendChild(copy);

      const artist = document.createElement('span');
      artist.className = 'track-artist';
      artist.setAttribute('role', 'cell');
      artist.textContent = track.banda;

      const duration = document.createElement('span');
      duration.className = 'track-duration';
      duration.setAttribute('role', 'cell');
      duration.textContent = currentTrack?.src === track.src && Number.isFinite(player.duration)
        ? formatTime(player.duration)
        : '—';

      row.append(indexCell, main, artist, duration);
      row.classList.toggle('active', currentTrack?.src === track.src);
      row.addEventListener('click', () => playTrack(track));
      fragment.appendChild(row);
    });

    trackList.replaceChildren(fragment);
    emptyState.hidden = filteredTracks.length !== 0;
    resultsCount.textContent = `${filteredTracks.length} ${filteredTracks.length === 1 ? 'faixa' : 'faixas'}`;
  }

  function setCurrentCover(track) {
    albumCover.src = track?.capa || '';
    albumCover.alt = track ? `Capa de ${track.titulo}` : 'Capa da música atual';
    albumCover.hidden = !track?.capa;
    albumCover.onerror = () => {
      albumCover.hidden = true;
    };
  }

  async function playTrack(track, autoplay = true) {
    if (!track) return;

    const changed = currentTrack?.src !== track.src;
    currentTrack = track;

    if (changed) {
      player.src = track.src;
      player.load();
    }

    songTitle.textContent = track.titulo;
    artistName.textContent = track.banda;
    setCurrentCover(track);
    renderTrackList();

    if (autoplay) {
      try {
        await player.play();
      } catch (error) {
        playerBar.classList.remove('is-playing');
      }
    }
  }

  function togglePlayback() {
    if (!currentTrack) {
      playTrack(featuredTrack);
      return;
    }

    if (player.paused) {
      player.play().catch(() => playerBar.classList.remove('is-playing'));
    } else {
      player.pause();
    }
  }

  function getPlaybackList() {
    return filteredTracks.length ? filteredTracks : catalog;
  }

  function changeTrack(direction) {
    const playbackList = getPlaybackList();
    if (!playbackList.length) return;

    if (!currentTrack) {
      playTrack(playbackList[0]);
      return;
    }

    let nextIndex;
    if (shuffleEnabled && playbackList.length > 1) {
      const currentIndex = playbackList.findIndex((track) => track.src === currentTrack.src);
      do {
        nextIndex = Math.floor(Math.random() * playbackList.length);
      } while (nextIndex === currentIndex);
    } else {
      const currentIndex = playbackList.findIndex((track) => track.src === currentTrack.src);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      nextIndex = (safeIndex + direction + playbackList.length) % playbackList.length;
    }

    playTrack(playbackList[nextIndex]);
  }

  function clearAllFilters() {
    query = '';
    selectedArtist = 'Todos';
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  }

  heroCover.src = featuredTrack?.capa || '';
  heroCover.addEventListener('error', () => heroCover.remove(), { once: true });

  renderArtistGrid();
  renderSidebarArtists();
  renderFilters();
  applyFilters();

  heroPlay.addEventListener('click', () => playTrack(featuredTrack));
  playPauseButton.addEventListener('click', togglePlayback);
  previousButton.addEventListener('click', () => changeTrack(-1));
  nextButton.addEventListener('click', () => changeTrack(1));

  shuffleButton.addEventListener('click', () => {
    shuffleEnabled = !shuffleEnabled;
    shuffleButton.classList.toggle('active', shuffleEnabled);
    shuffleButton.setAttribute('aria-label', shuffleEnabled ? 'Desativar ordem aleatória' : 'Ativar ordem aleatória');
  });

  repeatButton.addEventListener('click', () => {
    repeatEnabled = !repeatEnabled;
    player.loop = repeatEnabled;
    repeatButton.classList.toggle('active', repeatEnabled);
    repeatButton.setAttribute('aria-label', repeatEnabled ? 'Desativar repetição' : 'Repetir música');
  });

  searchInput.addEventListener('input', () => {
    query = searchInput.value.trim();
    applyFilters();
    if (query) document.getElementById('biblioteca').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  clearSearch.addEventListener('click', clearAllFilters);

  showAllArtists.addEventListener('click', () => {
    const expanded = artistGrid.classList.toggle('show-all');
    showAllArtists.textContent = expanded ? 'Mostrar menos' : 'Mostrar todos';
  });

  document.querySelectorAll('[data-focus-search]').forEach((button) => {
    button.addEventListener('click', () => {
      searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-scroll-library]').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('biblioteca').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-view="home"]').forEach((button) => {
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

  queueButton.addEventListener('click', () => {
    if (!currentTrack) return;
    const currentRow = document.querySelector(`[data-track-src="${CSS.escape(currentTrack.src)}"]`);
    currentRow?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  player.addEventListener('play', () => {
    playerBar.classList.add('is-playing');
    playPauseButton.setAttribute('aria-label', 'Pausar');
    playPauseButton.title = 'Pausar';
  });

  player.addEventListener('pause', () => {
    playerBar.classList.remove('is-playing');
    playPauseButton.setAttribute('aria-label', 'Tocar');
    playPauseButton.title = 'Tocar';
  });

  player.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(player.duration);
    progressInput.max = String(player.duration || 100);
    renderTrackList();
  });

  player.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(player.currentTime);
    progressInput.value = String(player.currentTime || 0);
    updateRangeFill(progressInput, player.currentTime || 0);
  });

  player.addEventListener('ended', () => {
    if (!repeatEnabled) changeTrack(1);
  });

  player.addEventListener('error', () => {
    playerBar.classList.remove('is-playing');
    if (currentTrack) artistName.textContent = `${currentTrack.banda} · não foi possível carregar`;
  });

  progressInput.addEventListener('input', () => {
    if (!Number.isFinite(player.duration)) return;
    player.currentTime = Number(progressInput.value);
    updateRangeFill(progressInput, progressInput.value);
  });

  const savedVolume = Number(localStorage.getItem('breso-volume'));
  const initialVolume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1 ? savedVolume : 0.8;
  player.volume = initialVolume;
  volumeInput.value = String(initialVolume);
  previousVolume = initialVolume || 0.8;
  updateRangeFill(volumeInput, initialVolume);

  volumeInput.addEventListener('input', () => {
    const volume = Number(volumeInput.value);
    player.volume = volume;
    player.muted = volume === 0;
    if (volume > 0) previousVolume = volume;
    localStorage.setItem('breso-volume', String(volume));
    updateRangeFill(volumeInput, volume);
    muteButton.classList.toggle('active', volume === 0);
  });

  muteButton.addEventListener('click', () => {
    if (player.muted || player.volume === 0) {
      player.muted = false;
      player.volume = previousVolume;
      volumeInput.value = String(previousVolume);
    } else {
      previousVolume = player.volume;
      player.muted = true;
      volumeInput.value = '0';
    }
    updateRangeFill(volumeInput, volumeInput.value);
    muteButton.classList.toggle('active', player.muted);
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

    if (event.key === '/' && !typing) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.code === 'Space' && !typing) {
      event.preventDefault();
      togglePlayback();
    }
  });
})();
