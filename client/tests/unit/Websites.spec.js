import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Websites from '@/components/websites/index.vue';
import WebsitesResult from '@/components/websites/WebsitesResult.vue';
import WebsitesInput from '@/components/websites/WebsitesInput.vue';

describe('Websites', () => {
  it('has child components', () => {
    const wrapper = shallowMount(Websites);

    expect(wrapper.findComponent(WebsitesInput).exists()).to.be.true;
    expect(wrapper.findComponent(WebsitesResult).exists()).to.be.true;
  });
});
