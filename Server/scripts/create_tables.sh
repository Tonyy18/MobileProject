cd tables
for FILE in *; 
do mysql -u $1 $2 < $FILE; 
done