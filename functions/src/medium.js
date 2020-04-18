//Source: https://medium.com/@oldirony/how-to-get-your-medium-posts-on-your-website-bcf45ab46529
const fs = require('fs');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const MEDIUM_FEED_API = 'https://medium.com/feed';

module.exports = {
    request: async (author) => {
        return require(`./data/medium${author}.json`);
    },
    generateData: async (author) => {
        try {
            const rssFeed = await axios.get(`${MEDIUM_FEED_API}/${author}`);
            const json = await parseStringPromise(rssFeed.data);
            const result = pretty(json);
            await fs.promises.writeFile(
                `${__dirname}/data/medium${author}.json`,
                JSON.stringify(result, null, 2)
            );
        } catch(error) {
            throw error;
        }
    }
}

function pretty(json) {
    const channel = json.rss.channel[0];
    const feed = {
        url: channel['atom:link'][0]['$'].href,
        title: channel.title[0],
        link: channel.link[0],
        author: '',
        description: channel.description[0],
        image: channel.image[0].url[0]
    }

    const items = channel.item.map(item => {
        const content = item['content:encoded'][0];
        return {
            title: item.title[0],
            pubDate: item['atom:updated'][0],
            link: item.link[0],
            author: item['dc:creator'][0],
            thumbnail: getThumbnail(content),
            categories: item.category,
            content
        }
    });

    return {
        feed,
        items
    };
}

function getThumbnail(content) {
    const images = content.match(/(https?:\/\/\S*\.(?:png|jpg|jpeg|gif))/);
    return images && images.length > 0 ? images[0] : '';
}