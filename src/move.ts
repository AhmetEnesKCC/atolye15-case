// Please update this type as same as with the data shape.

// Defined types

type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  // Checked if the destination and source is same
  // if this is the case throwed error

  if (destination === source) {
    throw new Error(
      'The destination is folder and source is file. Thus, they can not have the same id.',
    );
  }

  // Defined index of source file and folder and destination folder to -1 for default

  let indexOfSourceFolder = -1;

  let indexOfSourceFile = -1;

  let indexOfDestinationFolder = -1;

  // Created to track index of outer (folders) loop

  let i = 0;

  // assigned length of list as constant

  const lengthOfList = list.length;

  // Outer loop to scan source folder which includes file with id as source

  while (i < lengthOfList) {
    // Assigned length of file in current folder as constant

    const lengthOfFiles = list[i].files.length;

    // If given parameter source (file) equals to one of the folder's id throwed error

    if (list[i].id === source) {
      throw new Error('You cannot move a folder');
    }

    // Created to track index of inner (files) loop

    let k = 0;

    // Inner (files in folder) loop to scan the files in the current folder

    while (k < lengthOfFiles) {
      // if the given parameter source equals to current file's id assigned index of source file and folder

      if (list[i].files[k].id === source) {
        indexOfSourceFolder = i;
        indexOfSourceFile = k;
        // If find the destionation folder's index break
        if (indexOfDestinationFolder !== -1) {
          break;
        }
      }

      // if the given parameter destination equals to current folder id assigned current index to destination folder index

      if (list[i].id === destination) {
        indexOfDestinationFolder = i;
        // If find the source folder's index break
        if (indexOfSourceFolder !== -1) {
          break;
        }
      }

      // if the given parameter destination equals to one of the file's id throw error

      if (list[i].files[k].id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
      // Summed k by 1
      k += 1;
    }

    // if find destionation and source folder's id break;
    if (![indexOfSourceFolder, indexOfDestinationFolder].includes(-1)) {
      break;
    }

    // Summed i by 1
    i += 1;
  }

  // if the index of source folder and index of destionation folder is same and they are not equal to -1 throws error
  // Checked only the destionation folder because if they are equal the soruce folder must be different than -1
  if (indexOfSourceFolder === indexOfDestinationFolder && indexOfDestinationFolder !== -1) {
    throw new Error('You can not move the file to its current folder');
  }

  // if the loop above could not assing (find) the index of source folder throwed error

  if (indexOfSourceFolder === -1) {
    throw new Error('The source coult not find in database');
  }

  // if the loop above could not assing (find) the index of destination folder throwed error

  if (indexOfDestinationFolder === -1) {
    throw new Error('The destination coult not find in database');
  }

  // Assigned the properties of moving file to use after deleting from current position

  const moveFileProperties = list[indexOfSourceFolder].files[indexOfSourceFile];

  // Deleted the file from source folder

  list[indexOfSourceFolder].files.splice(indexOfSourceFile, 1);

  // Pasted into destination folder

  list[indexOfDestinationFolder].files.push(moveFileProperties);

  // Returned copy of list which has the new state of file
  return list;
}

// O(n * m)

// n = number of folder
// m = number of file in folder
