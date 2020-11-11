import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Icon from '@/components/icons/Icon.vue';

describe('Icon.vue', () => {
  it('has the right html', () => {
    const propsData = {
      iconName: 'name',
      width: '10',
      height: '20',
      viewBox: '0 0 1 1',
      iconColor: '#fff',
    };

    const wrapper = shallowMount(Icon, {
      propsData: propsData,
    });

    // test HTML
    expect(wrapper.get('.icon').exists()).to.be.true;

    expect(wrapper.get('.icon__svg').exists()).to.be.true;

    expect(wrapper.get('.icon__svg title').exists()).to.be.true;
  });
});
