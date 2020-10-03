# WARNING: ACTIVE DEVELOPMENT

# where2factors
An app to find out which website that you use has two factors authentication.

The idea is to use [twofactorauth.org](https://twofactorauth.org/) data to check a list of websites in order to find out which one has 2FA.

## Roadmap (60%)
- [x] A wireframe prototype of the frontend
- [x] A MongoDB database to store the websites data
- [x] A JS script to update the database from [twofactorauth.org](https://twofactorauth.org/)
- [x] Test the script with mocha and chai
- [x] An express web server to interact with the database
- [x] Test the api with mocha and chai
- [x] A Figma complete prototype of the frontend
- [ ] Continuous integration with GitHub Actions *(in development)*
- [ ] A VueJS frontend *(in development)*
- [ ] Unit test the front end
- [ ] E2E test the front end with Cypress
- [ ] Buy domain
- [ ] Host in an Hetzner VPS
- [ ] Continuous deployment with GitHub Actions
- [ ] Write a blog post about this project