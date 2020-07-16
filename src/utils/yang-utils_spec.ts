import {PathOptions, smartPath, YangUtils} from './yang-utils';


describe('YangUtils', () => {
  describe('smartPath', () => {
    const rootPath = '/aaa/bbb';
    const defaultOptions: PathOptions = {
      name: 'foo'
    };

    const expectResults = (options: PathOptions, path: string | undefined, name: string) => {
      expect(options.path).toBe(path);
      expect(options.name).toBe(name);
    };

    it('smartPath with no slash in name shoud be undefined', () => {
      const options = {...defaultOptions};

      smartPath(rootPath, options, 'xxx');
      expectResults(options, undefined, 'foo');
    });

    it('smartPath with path should be unchanged', () => {
      const options = {...defaultOptions, path: 'foo/bar'};

      smartPath(rootPath, options, 'xxx');
      expectResults(options, 'foo/bar', 'foo');
    });



    it('smartPath with slash in name', () => {
      const options = {...defaultOptions, name: 'foo/bar'};

      smartPath(rootPath, options, 'xxx');
      expectResults(options, '/aaa/bbb/features/foo', 'bar');
    });

    it('smartPath with shared in name', () => {
      const options = {...defaultOptions, name: 'shared/foo'};

      smartPath(rootPath, options, 'xxx');
      expectResults(options, '/aaa/bbb/shared/xxx', 'foo');
    });

    it('smartPath with shared in name and multiple folders', () => {
      const options = {...defaultOptions, name: 'shared/foo/bar/buz/biz'};

      smartPath(rootPath, options, 'xxx');
      expectResults(options, '/aaa/bbb/shared/foo/bar/buz', 'biz');
    });
  });

});
