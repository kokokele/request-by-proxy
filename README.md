# request-by-proxy

this is request by proxy in node.

# install

npm install --save request-by-proxy


# use 


```js
const rp =  require('request-by-proxy');

// rp(target, proxy, options);

rp( 'http://www.baidu.com', 'youdomin:port').then(res => {
        console.log(res);
    }).catch(err=> {
        console.log(err);
    });

```

## options

- method : 'POST' | 'GET' , default 'GET'
- writePath:  save response in disk path, default null
- postData: post data (JSON) , default null
- contentType: content-type: 'json' | 'formData', default 'formData'



