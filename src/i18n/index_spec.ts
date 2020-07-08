import {Tree} from '@angular-devkit/schematics';
import {runYangNew, yangSchematicRunner} from '../utils/test-utils';
import {UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as JestOptions} from '../proxy/schema';
import {getFileContent} from '@schematics/angular/utility/test';
import {YangUtils} from "../utils/yang-utils";


const defaultOptions: JestOptions = {
  skipInstall: true
};

describe('i18n Schematic', () => {
  describe('With empty project', () => {
    it('should throw error on empty tree', () => {
      return expect(yangSchematicRunner.runSchematicAsync('i18n', {}, Tree.empty()).toPromise()).rejects.toThrow();
    });
  });

  describe('With fresh project', () => {
    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await runYangNew().toPromise();
    });

    describe('With default options', () => {
      beforeEach(async () => {
        appTree = await yangSchematicRunner.runSchematicAsync('i18n', defaultOptions, appTree).toPromise();
      });

      it('should create files inside app', () => {
        const files = appTree.files;
        expect(files).toContain(`/src/assets/i18n/en.json`);
        expect(files).toContain(`/src/assets/i18n/fr.json`);
        expect(files).toContain(`/src/app/core/i18n.module.ts`);
      });

      it('should add I18NModule inside core.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.CORE_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*I18NModule.*from ['"].\/i18n.module['"]/);
      });

      it('should add TranslateModule inside shared.module', () => {
        const moduleContent = getFileContent(appTree, YangUtils.SHARED_MODULE_FILE);
        expect(moduleContent).toMatch(/import.*TranslateModule.*from ['"]@ngx-translate\/core['"]/);
      });
    });

  });
});
