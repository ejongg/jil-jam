export interface Section {
  name: string;
  content: string;
}

export enum Instrument {
  GUITAR = "guitar",
  BASS = "bass",
  PIANO = "piano",
}

export interface Chord {
  sections: Section[];
  originalKey: string;
  instruments: Instrument[];
}

export interface ISong {
  id: string;
  title: string;
  artist: string;
  chords: Chord[];
}
