import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Icon from '@/components/icons/Icon.vue';

describe('Icon.vue', () => {
  it('has the right html', () => {
    const propsData = {
      iconName: 'name',
      width: '1',
      height: '1',
      viewBox: '0 0 1 1',
      iconColor: '#fff',
    };

    const wrapper = shallowMount(Icon, {
      props: props,
    });

    // test HTML
    expect(wrapper.get('.icon').exists()).to.be.true;

    expect(wrapper.get('.icon__svg').exists()).to.be.true;
    expect(wrapper.get('.icon__svg').element.width).to.equal(props.width);
    expect(wrapper.get('.icon__svg').element.height).to.equal(props.height);
    expect(wrapper.get('.icon__svg').element.viewBox).to.equal(props.viewBox);
    expect(wrapper.get('.icon__svg').element['aria-labelledby']).to.equal(
      props.iconName,
    );

    expect(wrapper.get('.icon__svg title').exists()).to.be.true;

    expect(wrapper.get('.icon__svg g').exists()).to.be.true;
    expect(wrapper.get('.icon__svg g').element.fill).to.equal(props.iconColor);
  });
});
