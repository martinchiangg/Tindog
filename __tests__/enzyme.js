import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import renderer from 'react-test-renderer';

import { addCard } from '../client/actions/actions';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('LabeledText', () => {
    let wrapper;
    const props = {
      label: 'Mega',
      text: 'Markets',
    };

    beforeAll(() => {
      wrapper = shallow(<LabeledText {...props} />);
    });

    it('Renders a <p> tag with the label in bold', () => {
      expect(wrapper.type()).toEqual('p');
      expect(wrapper.text()).toEqual('Mega: Markets');
      expect(wrapper.find('strong').text()).toMatch('Mega');
    });

    it('LabeledText renders correctly', () => {
      const tree = renderer
        .create(<LabeledText {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('MarketDisplay', () => {
    let wrapper;
    const props = {
      percentage: 100,
      index: 2,
      location: 'Hogwarts',
      cards: 23,
      addCard: jest.fn(),
      deleteCard: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<MarketDisplay {...props} />);
    });

    it('A MarketDisplay should display all of its text props inside a LabeledText component', () => {
      expect(wrapper.containsMatchingElement(<LabeledText label="Market ID" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<LabeledText label="Location" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<LabeledText label="Cards" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<LabeledText label="% of total" />)).toEqual(true);
    });

    it('It should also contain a div with two buttons', () => {
      expect(wrapper.find('div.flex').find('button').length).toEqual(2);
    });

    it('The functions passed down should be invoked on click', () => {
      props.addCard.mockClear();
      props.deleteCard.mockClear();
      wrapper.find('button').forEach((node) => {
        node.simulate('click');
      });
      expect(props.addCard).toHaveBeenCalled();
      expect(props.deleteCard).toHaveBeenCalled();
    });

    it('MarketDisplay should render a div with a class of `marketBox`, and the interior div wrapping the two buttons should have a class of `flex', () => {
      expect(wrapper.hasClass('marketBox')).toEqual(true);
      expect(wrapper.find('div.flex').length).toEqual(1);
    });

    it('MarketDisplay renders correctly', () => {
      const tree = renderer
        .create(<MarketDisplay {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('MarketsDisplay', () => {
    let wrapper;
    const props = {
      totalCards: 15,
      marketList: [{ location: 'London', cards: 0 }, { location: 'Hogwarts', cards: 5 }, { location: 'Home', cards: 2 }],
      addCard: jest.fn(),
      deleteCard: jest.fn(),
    };

    beforeAll(() => {
      wrapper = shallow(<MarketsDisplay {...props} />);
    });

    it('A MarketsDisplay should have an h4 element to display the "Markets" title', () => {
      expect(wrapper.contains(<h4>Markets</h4>)).toEqual(true);
    });

    it('A single MarketDisplay is rendered for each market in the marketList prop', () => {
      // expect(wrapper.contains(<h4>Markets</h4>)).toEqual(true);
      expect(wrapper.find(MarketDisplay).length).toEqual(props.marketList.length);
    });

    // Test for zero, a whole number, and a fractional value. (Right now this
    // is implemented incorrectly, so follow TDD here)
    it('The percentage prop should be a string calculated to two decimals.', () => {
      wrapper.find(MarketDisplay).forEach(node => {
        expect(typeof node.props().percentage).toEqual('string');
        expect(node.props().percentage.split('.')[1].length).toEqual(2);
      });
    });

    it('MarketsDisplay renders correctly', () => {
      const tree = renderer
        .create(<MarketsDisplay {...props} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
