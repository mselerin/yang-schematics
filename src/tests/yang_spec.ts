import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';

describe('Yang global path tests', () => {
  let appTree: UnitTestTree;

  const runSchematic = async (schematic: string, options: any): Promise<void> => {
    appTree = await yangSchematicRunner.runSchematicAsync(schematic, options, appTree).toPromise();
  };

  const expectFile = (filename: string): void => {
    expect(appTree.files).toContain(filename);
  }

  beforeEach(async () => {
    appTree = await runYangNew().toPromise();
  });


  // Components
  it('simple component', async () => {
    await runSchematic('component', {name: 'foo'});
    expectFile(`/src/app/shared/components/foo/foo.component.ts`);

    await runSchematic('feature', {name: 'foo'});
    await runSchematic('component', {name: 'foo/bar/buz'});
    expectFile(`/src/app/features/foo/bar/buz/buz.component.ts`);
  });


  it('shared component', async () => {
    await runSchematic('component', {name: 'shared/foo'});
    expectFile(`/src/app/shared/components/foo/foo.component.ts`);

    await runSchematic('component', {name: 'shared/foo/bar/buz'});
    expectFile(`/src/app/shared/foo/bar/buz/buz.component.ts`);
  });


  // Directives
  it('simple directive', async () => {
    await runSchematic('directive', {name: 'foo'});
    expectFile(`/src/app/shared/directives/foo.directive.ts`);

    await runSchematic('feature', {name: 'foo'});
    await runSchematic('directive', {name: 'foo/bar/buz'});
    expectFile(`/src/app/features/foo/bar/buz.directive.ts`);
  });

  it('shared directive', async () => {
    await runSchematic('directive', {name: 'shared/foo'});
    expectFile(`/src/app/shared/directives/foo.directive.ts`);

    await runSchematic('directive', {name: 'shared/foo/bar/buz'});
    expectFile(`/src/app/shared/foo/bar/buz.directive.ts`);
  });


  // Pipes
  it('simple pipe', async () => {
    await runSchematic('pipe', {name: 'foo'});
    expectFile(`/src/app/shared/pipes/foo.pipe.ts`);

    await runSchematic('feature', {name: 'foo'});
    await runSchematic('pipe', {name: 'foo/bar/buz'});
    expectFile(`/src/app/features/foo/bar/buz.pipe.ts`);
  });

  it('shared pipe', async () => {
    await runSchematic('pipe', {name: 'shared/foo'});
    expectFile(`/src/app/shared/pipes/foo.pipe.ts`);

    await runSchematic('pipe', {name: 'shared/foo/bar/buz'});
    expectFile(`/src/app/shared/foo/bar/buz.pipe.ts`);
  });


  // Modules
  it('simple module', async () => {
    await runSchematic('module', {name: 'foo'});
    expectFile(`/src/app/shared/foo/foo.module.ts`);

    await runSchematic('feature', {name: 'foo'});
    await runSchematic('module', {name: 'foo/bar/buz'});
    expectFile(`/src/app/features/foo/bar/buz/buz.module.ts`);
  });

  it('shared module', async () => {
    await runSchematic('module', {name: 'shared/foo'});
    expectFile(`/src/app/shared/foo/foo.module.ts`);

    await runSchematic('module', {name: 'shared/biz', flat: true});
    expectFile(`/src/app/shared/biz.module.ts`);

    await runSchematic('module', {name: 'shared/foo/bar/buz'});
    expectFile(`/src/app/shared/foo/bar/buz/buz.module.ts`);
  });


  // Services
  it('service', async () => {
    await runSchematic('service', {name: 'foo'});
    expectFile(`/src/app/services/foo.service.ts`);

    await runSchematic('service', {name: 'bar/buz/biz'});
    expectFile(`/src/app/services/bar/buz/biz.service.ts`);

    await runSchematic('service', {name: 'baz', flat: false});
    expectFile(`/src/app/services/baz/baz.service.ts`);
  });


  // Features
  it('feature', async () => {
    await runSchematic('feature', {name: 'foo'});
    expectFile(`/src/app/features/foo/foo.module.ts`);

    await runSchematic('feature', {name: 'foo/bar/buz'});
    expectFile(`/src/app/features/foo/bar/buz/buz.module.ts`);
  });
});
