var ghpages = require('gh-pages');


ghpages.publish('src', {
    repo: 'git@github.com:avil13/iron-man-speech.git'
}, function(err) {
    if (err) {
        console.log(err);
    }

    console.log(' https://avil13.github.io/iron-man-speech/ \n\n');
});
