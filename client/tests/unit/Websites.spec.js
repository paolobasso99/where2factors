import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Websites from '@/components/websites/index.vue';

describe('Website.vue', () => {
  it('without doc and exception', () => {
    // test HTML
    expect(wrapper.get('.website').exists()).to.be.true;
  });
});
