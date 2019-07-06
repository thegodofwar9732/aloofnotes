NEW NPM SCRIPTS:
npm run build-client
- now builds the static files and moves them all to another repo such that
it can be later (via the deploy script) deployed to github pages
and fixes the urls(css/js paths in index.html and api link in main js file)
npm run deploy-client
- this automates the git add, commit and push so that static files can be automatically deployed
to github pages
npm run update-client
 - automatically does both of the above scripts, THIS IS WHAT YOU WILL RUN

Refresher:
just added react router, so its easier to different things like react spring, without commenting things out repeatedly
and i would need it anyway for login

Reading client root component help:
Router.js is the actual ROOT of the react app and its only child is App.js
App.js will contains the route components

How to switch to production?
Do the following commands in the root project folder:
export NODE_ENV=production
npm run build

How to switch to development?
Do the following commands in the root project folder:
export NODE_ENV=development
npm run build


How are __dirname and __filename handled by webpack?
If the following options are not set to true or false, __dirname may default to ~
If false, __dirname does not change, so its still the directory of the original file
If true, __dirname will be the directory of the bundled file

node: {
        __dirname: false,
        __filename: false,
    },

Remaining Bugs to take care of:
&nbsp can be entered in title box after some spaces