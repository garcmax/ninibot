import * as LOGGER from "../admin/log"
import * as config from "../admin/config"

var request = require('request');


export default function ytSearch(opts, callback) {
    let query = encodeUrl(opts);
    let options = {
        url: "https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&order=relevance&type=video&q=" + query + "&key=" + config.credentials.googleToken,
    };
    request(options, function(error, response, body) {
        if (error) {
            LOGGER.LOG(error);
        } else {
            LOGGER.LOG(body);
            let res = JSON.parse(body);
            let data = res.items ? res.items[0] : undefined;
            if(response.statusCode === 200 && data) {
                callback(null, "http://www.youtube.com/watch?v=" + data.id.videoId);
            } else {
                callback({statusCode : response.statusCode, data: data});
            }
        }
    });
}

function encodeUrl(str) {
    return encodeURIComponent(str).replace(/%20/gi, '+');
}
