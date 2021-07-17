import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from '@/components/Login/LoginComponent';

describe('<LoginComponent />', () => {
  it('renders two input', () => {
    const wrapper = shallow(<LoginComponent />);
    expect(wrapper.find('input')).toHaveLength(2);
  });
});
