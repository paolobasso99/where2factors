import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Website from '@/components/websites/Website.vue';

describe('Website.vue', () => {
  describe('with TFA', () => {
    it('without doc and exception', () => {
      const website = {
        tfa: ['sms', 'totp', 'u2f'],
        name: 'Dropbox',
        url: 'https://www.dropbox.com',
        host: 'www.dropbox.com',
        category: 'backup',
        domain: 'dropbox.com',
        img:
          'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/backup/dropbox.png',
      };
      const wrapper = shallowMount(Website, {
        propsData: {
          website: website,
        },
      });

      // test HTML
      expect(wrapper.get('.website').exists()).to.be.true;
      expect(wrapper.get('.website__header__main__item--name').text()).to.equal(
        website.name,
      );
      expect(wrapper.get('.website__header__main__img').element.src).to.equal(
        website.img,
      );
      expect(wrapper.get('.website__header__query').text()).to.equal(
        website.host,
      );
      expect(
        wrapper.findAllComponents('.website__methods__list__method').length,
      ).to.equal(website.tfa.length);

      // Doc and exception
      expect(wrapper.get('.website__header__main__item__link--doc').exists()).to
        .be.false;
      expect(wrapper.get('.website__header__main__item--exception').exists()).to
        .be.false;
    });

    it('with doc and exception', () => {
      const website = {
        tfa: ['sms', 'totp', 'u2f'],
        name: 'Dropbox',
        url: 'https://www.dropbox.com',
        host: 'www.dropbox.com',
        category: 'backup',
        domain: 'dropbox.com',
        img:
          'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/backup/dropbox.png',
        doc: 'https://help.dropbox.com/security/enable-two-step-verification',
        exception:
          'Hardware 2FA requires also enabling Software or SMS 2FA as a back-up.',
      };
      const wrapper = shallowMount(Website, {
        propsData: {
          website: website,
        },
      });

      // test HTML
      expect(wrapper.get('.website').exists()).to.be.true;
      expect(wrapper.get('.website__header__main__item--name').text()).to.equal(
        website.name,
      );
      expect(wrapper.get('.website__header__main__img').element.src).to.equal(
        website.img,
      );
      expect(wrapper.get('.website__header__query').text()).to.equal(
        website.host,
      );
      expect(
        wrapper.findAllComponents('.website__methods__list__method').length,
      ).to.equal(website.tfa.length);

      // Exception and doc
      expect(
        wrapper.get('.website__header__main__item__link--doc').element.href,
      ).to.equal(website.doc);
      expect(wrapper.get('.website__header__main__item--exception').exists()).to
        .be.true;
    });
  });
});
