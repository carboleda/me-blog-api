const fs = require('fs');
const scrapeIt = require('scrape-it');
const scrapingDefinition = {
    presentations: {
        listItem: 'li.deck.public',
        data: {
            title: 'span.deck-title-value',
            description: 'span.deck-description-value ',
            createAt: 'div.deck-metadata span.deck-metadata-item.status',
            link: {
                selector: 'a.deck-link',
                attr: 'href',
                convert: link => `https://slides.com${link}`
            },
            image: {
                selector: 'div.deck-image',
                attr: 'style',
                convert: el => el.replace(/\(|\)|\'|(background-image: url)/g, '')
            },
            dataImage: {
                selector: 'div.deck-image',
                attr: 'data-image-url'
            }
        }
    }
};
const page = 'https://slides.com/carboleda';

module.exports = {
    request: async () => {
        return require('./data/slides.json');
    },
    generateData: async () => {
        try {
            const scrapeResult = await scrapeIt(page, scrapingDefinition);
            const { data } = scrapeResult;

            const result = data.presentations.map(pre => {
                pre.image = pre.dataImage ? pre.dataImage : pre.image;
                delete pre.dataImage;
                return pre;
            });
            await fs.promises.writeFile(
                `${__dirname}/data/slides.json`,
                JSON.stringify(result, null, 2)
            );
        } catch(error) {
            throw error;
        }
    }
}