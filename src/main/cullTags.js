// Frame → your field name (strings, not values)
const id3v2FieldMap = {
  TALB: 'album',
  TIT2: 'title',
  TBPM: 'beatsPerMinutes',
  TCOM: 'composer',
  TCOP: 'copyright',
  TPUB: 'publisher',
  TSRC: 'isrc',
  TCON: 'genres',
  TPE1: 'performers',
  TPE2: 'albumArtists', // de-facto Album Artist
  TPE3: 'conductor',
  TPE4: 'remixedBy',
  COMM: 'comment',
  USLT: 'lyrics',
  APIC: 'pictures',
  TYER: 'year', // v2.3
  TDRC: 'year' // v2.4 (prefer over TYER below)
};

function cullTags(tags, fileType) {
  // prefer v2.4 frames; fallback to v2.3
  const frames = tags['ID3v2.4'] ?? tags['ID3v2.3'] ?? [];
  const out = {}; // only put keys we actually see

  for (const { id, value } of frames) {
    if (id === 'TRCK') {
      const [no, of] = String(value ?? '').split('/');
      if (no) out.track = no.trim();
      if (of) out.trackCount = of.trim();
      continue;
    }
    if (id === 'TPOS') {
      const [no, of] = String(value ?? '').split('/');
      if (no) out.disc = no.trim();
      if (of) out.discCount = of.trim();
      continue;
    }

    const field = id3v2FieldMap[id];
    if (!field || value == null || value === '') continue;

    // Prefer TDRC over TYER if both show up
    if (field === 'year' && id === 'TYER' && 'year' in out) continue;

    // First non-empty wins; no array conversion here
    if (!(field in out)) out[field] = value;
  }

  return out; // only fields that were present
}

export default cullTags;
