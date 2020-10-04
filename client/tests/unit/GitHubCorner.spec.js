import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import GitHubCorner from '@/components/layout/GitHubCorner.vue';

describe('GitHubCorner.vue', () => {
  it('has the right html', () => {
    const url = 'https://github.com/paolobasso99/where2factors';
    const wrapper = shallowMount(GitHubCorner, {
      props: {
        url: url,
      },
    });

    // test HTML
    expect(wrapper.get('a.github-corner').exists()).to.equal(true);
    expect(wrapper.get('a.github-corner svg').exists()).to.equal(true);
    expect(wrapper.get('a.github-corner svg path').exists()).to.equal(true);

    // Test url
    console.log(wrapper.get('a.github-corner').element.href);
    expect(wrapper.get('a.github-corner').element.href).to.equal(url);
  });
});
