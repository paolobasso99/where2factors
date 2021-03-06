# WARNING: ACTIVE DEVELOPMENT
[![Known Vulnerabilities](https://snyk.io/test/github/paolobasso99/where2factors/badge.svg)](https://snyk.io/test/github/paolobasso99/where2factors)
[![Maintainability](https://api.codeclimate.com/v1/badges/79a76b32839887e1b6a6/maintainability)](https://codeclimate.com/github/paolobasso99/where2factors/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/paolobasso99/where2factors/badge)](https://www.codefactor.io/repository/github/paolobasso99/where2factors)
[![codebeat badge](https://codebeat.co/badges/3132a8da-4b05-489b-91c1-fccbe5676cf8)](https://codebeat.co/projects/github-com-paolobasso99-where2factors-master)

# where2factors
An app to find out which website that you use has two factor authentication.

The idea is to use [twofactorauth.org](https://twofactorauth.org/) data to check a list of websites in order to find out which one has 2FA.

## Roadmap (60%)
- [x] A wireframe prototype of the frontend
- [x] A MongoDB database to store the websites data
- [x] A JS script to update the database from [twofactorauth.org](https://twofactorauth.org/)
- [x] Test the script with mocha and chai
- [x] An express web server to interact with the database
- [x] Test the api with mocha and chai
- [x] A Figma complete prototype of the frontend
- [x] Continuous integration with GitHub Actions *(2020/10/04)*
- [X] A VueJS frontend *(2020/10/0)*
- [X] Unit test the front end *(in development)*
- [X] Component test front end *(in development)*
- [X] Favicon
- [ ] SEO
- [ ] Buy domain
- [ ] Host in an Hetzner VPS
- [ ] Continuous deployment with GitHub Actions
- [ ] Write a blog post about this project
- [ ] Share
- [ ] PWA
- [X] E2E test the front end with Cypress
- [ ] Automatic accessibility test with AXE
- [ ] Automatic Lighthouse Audit
- [ ] Sentry integration 