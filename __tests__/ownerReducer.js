import subject from '../client/reducers/marketsReducer';

describe('MegaMarkets reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      totalMarkets: 0,
      totalCards: 0,
      marketList: [],
      newLocation: '',
      synced: true,
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('ADD_MARKET', () => {
    const action = {
      type: 'ADD_MARKET',
      payload: 'Azkaban',
    };

    it('adds a market', () => {
      const { marketList } = subject(state, action);
      expect(marketList[0]).toEqual({
        location: 'Azkaban',
        cards: 0,
      });
    });

    it('increases total market count by 1', () => {
      const { totalMarkets } = subject(state, action);
      expect(totalMarkets).toEqual(1)
    });

    // Remember that in Redux we never mutate. If something changes, we copy
    // the data structure! Hint: `.toBe` or `.not.toBe` are your questions.
    it('returns a state object not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(newState).not.toBe(state)
    });

    it('includes a marketList not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(newState.marketList).not.toBe(state.marketList)
    });

    it('clears the newLocation field', () => {
      const newState = subject(state, action);
      expect(newState.newLocation).toBe("")
    });
  });

  describe('UPDATE_LOCATION', () => {
    const action = {
      type: 'UPDATE_LOCATION',
      payload: 'Hogwarts',
    };

    it('updates location with the action payload', () => {
      const newState = subject(state, action);
      expect(newState.newLocation).toEqual(action.payload)
    });

    it('returns a state object not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(newState).not.toBe(state)
    });

    it('doesn\'t touch the marketList array', () => {
      const newState = subject(state, action);
      expect(newState.marketList).toBe(state.marketList)
    });
  });

  describe('ADD_CARD', () => {

    beforeEach(() => {
      state = {
        totalMarkets: 2,
        totalCards: 10,
        marketList: [{ location: "Hogwarts", cards: 0 }, { location: "Azkaban", cards: 10 }],
        newLocation: '',
        synced: true,
      };
    });
    const action = {
      type: 'ADD_CARD',
      payload: 0
    };

    it('increases card count of market specified by payload', () => {
      const newState = subject(state, action);
      expect(state.marketList[action.payload].cards + 1).toEqual(newState.marketList[action.payload].cards)
    });

    it('increases total card count by 1', () => {
      const newState = subject(state, action);
      expect(state.totalCards + 1).toEqual(newState.totalCards)
    });

    it('includes a marketList not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(state.marketList).not.toBe(newState.marketList)
    });

    it('does not mutate or duplicate other markets in marketList', () => {
      const newState = subject(state, action);
      expect(state.marketList.length).toEqual(newState.marketList.length)
      expect(newState.marketList[1]).toBe(state.marketList[1])
    });
  });

  describe('DELETE_CARD', () => {
    beforeEach(() => {
      state = {
        totalMarkets: 2,
        totalCards: 11,
        marketList: [{ location: "Hogwarts", cards: 1 }, { location: "Azkaban", cards: 10 }],
        newLocation: '',
        synced: true,
      };
    });
    const action = {
      type: 'DELETE_CARD',
      payload: 0
    };

    it('decreases card count of market specified by payload', () => {
      const newState = subject(state, action);
      expect(state.marketList[action.payload].cards - 1).toEqual(newState.marketList[action.payload].cards)
    });

    it('decreases total card count by 1', () => {
      const newState = subject(state, action);
      expect(state.totalCards - 1).toEqual(newState.totalCards)
    });

    it('includes a marketList not strictly equal to the original', () => {
      const newState = subject(state, action);
      expect(state.marketList).not.toBe(newState.marketList)
    });

    it('does not mutate or duplicate other markets in marketList', () => {
      const newState = subject(state, action);
      expect(state.marketList.length).toEqual(newState.marketList.length)
      expect(newState.marketList[1]).toBe(state.marketList[1])
    });
  });

  // The rest is functionality not included in the original MegaMarkets unit.
  // In short:
  //   1. SYNC_MARKETS is our action for writing markets to our "database." The
  //   only part of client state it affects is the "synced" property on
  //   markets, which activates/deactivates the button.
  //   2. LOAD_MARKETS only happens once, on page load, to load up markets from
  //   the database.
  describe('SYNC_MARKETS', () => {
    beforeEach(() => {
      state = {
        totalMarkets: 2,
        totalCards: 11,
        marketList: [{ location: "Hogwarts", cards: 1 }, { location: "Azkaban", cards: 10 }],
        newLocation: '',
        synced: false,
      };
    });

    const action = {
      type: 'SYNC_MARKETS',
      payload: null
    };

    it('sets synced to true', () => {
      const newState = subject(state, action);
      expect(newState.synced).toEqual(true)
    });
  });

  describe('LOAD_MARKETS', () => {
    beforeEach(() => {
      state = {
        totalMarkets: 0,
        totalCards: 0,
        marketList: [],
        newLocation: '',
        synced: false,
      };
    });

    const action = {
      type: 'LOAD_MARKETS',
      payload: [{ location: "Hogwarts", cards: 1 }, { location: "Azkaban", cards: 10 }]
    };

    it('replaces its marketList with the payload as-is', () => {
      const newState = subject(state, action)
      expect(newState.totalMarkets).toEqual(action.payload.length)
      expect(newState.totalCards).toEqual(action.payload.reduce((res, m) => res + m.cards, 0))
      expect(newState.marketList).toEqual(action.payload)
    });

    it('sets the correct totalMarkets count', () => {
      const newState = subject(state, action)
      expect(newState.totalMarkets).toEqual(2)
    });

    it('sets the correct totalCards count', () => {
      const newState = subject(state, action)
      expect(newState.totalCards).toEqual(11)
    });
  });
});
