/**
 * @file index
 * @author zhangpeng
 */
const http = require("http");
const fs = require('fs');
const url =  require('url-parse');
const querystring = require('querystring');

const req = (target, proxy, opt = {}) => {

    const p = url(proxy);
    const to = url(target);

    const method = opt.type || 'GET';
    // must postdata something
    let postData = opt.postData || {a:1};
    

    let contentType = 'application/x-www-form-urlencoded';
    if (opt.contentType === 'json') {
        contentType = 'application/json';
        try {
            postData = JSON.stringify(postData);
        } catch(err) {
            throw 'postData is not json';
        }
        
    } else {
        postData = querystring.stringify(postData);
    }

    if (!p.hostname  && !p.port) {
        if (p.pathname.indexOf(':') !== -1) {
            const tmp = p.pathname.split(':');
            p.hostname = tmp[0];
            p.port = tmp[1];
    
        } else {
            p.hostname = p.pathname;
            p.port = 80;
        }
    }

    const options = {
        host: p.hostname,
        port: p.port,
        path: target,
        method,
        headers: {
            Host: to.hostname,
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    console.log(options);
    console.log('-------------');

    return new Promise((resolve, reject) => {
        const req = http.request(options, function(res) {
            let resData = "";
            res.on("data",function(data){
                resData += data;
            });
            res.on("end", function() {
                // console.log(resData);
                resolve(resData);
            });

            res.on('error', (err) => {
                reject(err);
            });

            if (opt.writePath) {
                const out = fs.createWriteStream(opt.writePath, 'utf-8');
                res.pipe(out);
            }
            // console.log(res.data);
            // res.pipe(process.stdout);
        });
        req.write(postData);
    });
    
}

module.exports = req;