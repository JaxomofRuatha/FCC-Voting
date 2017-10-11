import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next } from '../src/server/index';

describe('Set up voting entries', () => {
  it('adds entries for a vote to state', () => {
    const state = Map();
    const entries = List.of('Kirk', 'Picard');
    const nextState = setEntries(state, entries);
    expect(nextState).to.equal(Map({
      entries: List.of('Kirk', 'Picard')
    }));
  });

  it('converts iterable to Immutable List', () => {
    const state = Map();
    const entries = ['Kirk', 'Picard'];
    const nextState = setEntries(state, entries);
    expect(nextState).to.equal(Map({
      entries: List.of('Kirk', 'Picard')
    }));
  });

  it('determines the next two head to head entries', () => {
    const state = Map({
      entries: List.of('Kirk', 'Picard', 'Janeway')
    });
    const nextState = next(state);
    expect(nextState).to.equal(Map({
      vote: Map({
        pair: List.of('Kirk', 'Picard')
      }),
      entries: List.of('Janeway')
    }));
  });
});
