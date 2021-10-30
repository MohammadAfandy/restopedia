import LocalStorageHelper from '../src/scripts/utils/local-storage-helper';

describe('Local Storage Helper', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to set local storage correctly', async () => {
    LocalStorageHelper.set('keyOne', 'valueOne');
    expect(LocalStorageHelper.get('keyOne')).toBe('valueOne');
  });

  it('should be able to delete local storage correctly', async () => {
    LocalStorageHelper.set('keyOne', 'valueOne');
    LocalStorageHelper.remove('keyOne');
    expect(LocalStorageHelper.get('keyOne')).toBeNull();
  });

  it('should be able to clear all local storage', async () => {
    LocalStorageHelper.set('keyOne', 'valueOne');
    LocalStorageHelper.set('keyTwo', 'valueTwo');
    LocalStorageHelper.set('keyThree', 'valueThree');
    LocalStorageHelper.clear();
    expect(LocalStorageHelper.get('keyOne')).toBeNull();
    expect(LocalStorageHelper.get('keyTwo')).toBeNull();
    expect(LocalStorageHelper.get('keyThree')).toBeNull();
  });
});
