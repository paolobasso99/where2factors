import axios from 'axios';

describe('Test Home', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains(
      'h2',
      'where2factors helps you to find which websites that you use have two factors authentication (TFA)',
    );

    // Get
    cy.get('.websites__input__textarea').type(
      'amazon.com\nfilethis.com\ndropbox.com\ndegoo.com\nexample1.com\nexample2.com',
    );

    cy.server();
    cy.route({
      url: '/api/websites',
      response: {
        found: [
          {
            tfa: ['totp', 'hardware'],
            _id: '5f773bc93ec70205202ed53b',
            name: 'Amazon AWS WorkSpaces',
            url: 'https://aws.amazon.com/workspaces/',
            host: 'aws.amazon.com',
            category: 'remote',
            domain: 'amazon.com',
            img:
              'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/remote/awsworkspaces.png',
            doc:
              'https://aws.amazon.com/blogs/aws/multi-factor-auth-for-workspaces/',
            __v: 0,
          },
          {
            tfa: [],
            _id: '5f773bc53ec70205202ecb29',
            name: 'FileThis',
            url: 'https://filethis.com',
            host: 'filethis.com',
            category: 'backup',
            domain: 'filethis.com',
            twitter: 'FileThisCompany',
            facebook: 'FileThis',
            img:
              'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/backup/filethis.png',
            __v: 0,
          },
          {
            tfa: ['sms', 'totp', 'u2f'],
            _id: '5f773bc53ec70205202ecb04',
            name: 'Dropbox',
            url: 'https://www.dropbox.com',
            host: 'www.dropbox.com',
            category: 'backup',
            domain: 'dropbox.com',
            img:
              'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/backup/dropbox.png',
            doc:
              'https://help.dropbox.com/security/enable-two-step-verification',
            exception:
              'Hardware 2FA requires also enabling Software or SMS 2FA as a back-up.',
            __v: 0,
          },
          {
            tfa: [],
            _id: '5f773bc53ec70205202eca7a',
            name: 'Degoo',
            url: 'https://degoo.com/',
            host: 'degoo.com',
            category: 'backup',
            domain: 'degoo.com',
            twitter: 'DegooBackup',
            facebook: 'DegooBackup',
            email_address: 'support@degoo.com',
            img:
              'https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/backup/degoo.png',
            __v: 0,
          },
        ],
        notFound: ['example1.com', 'example2.com'],
      },
      method: 'POST',
    });

    cy.get('.websites__input__submit').click();
  });
});
