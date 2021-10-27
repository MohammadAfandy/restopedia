import UrlParser from '../src/scripts/utils/url-parser';

describe('URL Parser', () => {
  describe('URL Splitter', () => {
    it('should be able to split url string with only resource property', async () => {
      const url = '/restaurants';
      const splitted = UrlParser.urlSplitter(url);
  
      expect(splitted).toEqual({
        resource: 'restaurants',
        id: null,
        verb: null,
      });
    });
  
    it('should be able to split url string with resource and id property', async () => {
      const url = '/restaurants/istana-emas-ygewwl55ktckfw1e867';
      const splitted = UrlParser.urlSplitter(url);
  
      expect(splitted).toEqual({
        resource: 'restaurants',
        id: 'istana-emas-ygewwl55ktckfw1e867',
        verb: null,
      });
    });
  
    it('should be able to split url string with resource, id, and verb property', async () => {
      const url = '/restaurants/istana-emas-ygewwl55ktckfw1e867/post';
      const splitted = UrlParser.urlSplitter(url);
  
      expect(splitted).toEqual({
        resource: 'restaurants',
        id: 'istana-emas-ygewwl55ktckfw1e867',
        verb: 'post',
      });
    });
  });

  describe('URL Combiner', () => {
    it('should be able to combine url from given splitter with only resource', async () => {
      const splitted = {
        resource: 'restaurants',
        id: null,
        verb: null,
      };
      const combiner = UrlParser.urlCombiner(splitted);

      expect(combiner).toBe('/restaurants');
    });

    it('should be able to combine url from given splitter with resource and id', async () => {
      const splitted = {
        resource: 'restaurants',
        id: 'istana-emas-ygewwl55ktckfw1e867',
        verb: null,
      };
      const combiner = UrlParser.urlCombiner(splitted);

      expect(combiner).toBe('/restaurants/:id');
    });

    it('should be able to combine url from given splitter with resource, id, and verb', async () => {
      const splitted = {
        resource: 'restaurants',
        id: 'istana-emas-ygewwl55ktckfw1e867',
        verb: 'post',
      };
      const combiner = UrlParser.urlCombiner(splitted);

      expect(combiner).toBe('/restaurants/:id/post');
    });
  });

  describe('URL Slug', () => {
    it('should be able to generate slug correctly', async () => {
      const name1 = 'Never Gonna Give You Up';
      const name2 = 'nEvEr gOnnA leT YoU doWn';
      const name3 = 'NeverGonnaRunAroundAndDesertYou';
      const name4 = 'Never    gonna   make you   cry';
      const name5 = '   never gonna say goodbye  ';
      const name6 = `
        Never \n gonna  \r tell a lie and
        hurt you
      `;

      expect(UrlParser.slugify(name1)).toBe('never-gonna-give-you-up');
      expect(UrlParser.slugify(name2)).toBe('never-gonna-let-you-down');
      expect(UrlParser.slugify(name3)).toBe('nevergonnarunaroundanddesertyou');
      expect(UrlParser.slugify(name4)).toBe('never-gonna-make-you-cry');
      expect(UrlParser.slugify(name5)).toBe('never-gonna-say-goodbye');
      expect(UrlParser.slugify(name6)).toBe('never-gonna-tell-a-lie-and-hurt-you');
    });

    it('should be able to parse id from slug', async () => {
      const name = 'Bring Your Phone Cafe';
      const slug = UrlParser.slugify(name);
      const id = UrlParser.parseIdFromSlug(`${slug}-some_random_id`);

      expect(id).toBe('some_random_id');
    });
  });

  describe('URL Parse Active Url', () => {
    it('should be able to parse active url with combiner', async () => {
      window.location.hash = '/restaurants/istana-emas-ygewwl55ktckfw1e867';
      const urlWithCombiner = UrlParser.parseActiveUrlWithCombiner();

      expect(urlWithCombiner).toBe('/restaurants/:id');
    });

    it('should be able to parse active url without combiner', async () => {
      window.location.hash = '/restaurants/istana-emas-ygewwl55ktckfw1e867';
      const urlWithoutCombiner = UrlParser.parseActiveUrlWithoutCombiner();

      expect(urlWithoutCombiner).toEqual({
        resource: 'restaurants',
        id: 'istana-emas-ygewwl55ktckfw1e867',
        verb: null,
      });
    });
  });
});
