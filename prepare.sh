###
# Copyright 2022, Suyooo
# 
# Copying and distribution of this file, with or without modification, are permitted in any medium without royalty, provided the copyright notice and this notice are preserved. This file is offered as-is, without any warranty.
###

mkdir -p scaled slot1 slot2 slot3 slot4
rm -f scaled/* slot1/* slot2/* slot3/* slot4/*
mogrify -resize 960x540 -path scaled +repage images/*
mogrify -crop 244x348+0+32 -path slot1 scaled/*
mogrify -crop 240x348+244+32 -path slot2 scaled/*
mogrify -crop 240x348+484+32 -path slot3 scaled/*
mogrify -crop 236x348+723+32 -path slot4 scaled/*
