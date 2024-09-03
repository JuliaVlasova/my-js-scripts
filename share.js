var facebookScript = document.createElement('script');
var twitterScript = document.createElement('script');
var linkedinScript = document.createElement('script');
facebookScript.src = '/themes/basic/js/facebook.js';
twitterScript.src = '//platform.twitter.com/widgets.js';
linkedinScript.src = '//platform.linkedin.com/in.js';
window.setTimeout(function() {
    document.body.appendChild(facebookScript);
    document.body.appendChild(twitterScript);
    document.body.appendChild(linkedinScript);
}, 3000);