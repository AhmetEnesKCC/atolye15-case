import move from './move';

describe('move', () => {
  it('moves given file to another folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '4', name: 'File 3' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [{ id: '7', name: 'File 5' }],
      },
    ];

    const result = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [
          { id: '7', name: 'File 5' },
          { id: '4', name: 'File 3' },
        ],
      },
    ];

    expect(move(list, '4', '6')).toStrictEqual(result);
  });

  it('throws error if given source is not a file', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [] },
    ];

    expect(() => move(list, '3', '1')).toThrow('You cannot move a folder');
  });

  it('throws error if given destination is not a folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [{ id: '4', name: 'File 2' }] },
    ];

    expect(() => move(list, '2', '4')).toThrow('You cannot specify a file as the destination');
  });

  it('throws error if given destination does not include in the list as file or folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [] },
    ];
    expect(() => move(list, '2', '5')).toThrow('The destination coult not find in database');
  });
  it('throws error if given source does not include in the list as file or folder', () => {
    const list = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [] },
    ];
    expect(() => move(list, '5', '3')).toThrow('The source coult not find in database');
  });
  it('throws error if given source and destination is same', () => {
    const list = [
      {
        id: '5',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '4', name: 'Folder 2', files: [] },
    ];
    expect(() => move(list, '5', '5')).toThrow(
      'The destination is folder and source is file. Thus, they can not have the same id.',
    );
  });
  it('throws error if the source folder and destination folder is same', () => {
    const list = [
      {
        id: '5',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '4', name: 'Folder 2', files: [] },
    ];
    expect(() => move(list, '2', '5')).toThrow('You can not move the file to its current folder');
  });
});
