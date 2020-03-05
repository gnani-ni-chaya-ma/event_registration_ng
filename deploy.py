import gzip
import shutil
import os

base_dir = './dist/'

def del_file(file):
    os.remove(base_dir  + file)


def make_gzip(file):
    file_path = base_dir + file
    gziped_name = file_path + '.gz'
    with open(file_path, 'rb') as in_file:
        with gzip.open(gziped_name, 'wb') as out_file:
            shutil.copyfileobj(in_file, out_file)
            del_file(file)
            os.rename(gziped_name, gziped_name[0:-3])




def main():
    
    files = os.listdir(base_dir)
    for file in files:
        extension = file.split('.')
        if len(extension) > 1 and extension[-1] in ['js', 'css']:
            print(file)
            make_gzip(file)


if __name__ == '__main__':
    main() 
